(function(){
  const KEY='wdompet_v2_transactions',FUNDS='wdompet_v2_funds',TRANSFERS='wdompet_v2_transfers',BUDGET='wdompet_v2_budget',OWNER='wdompet_v2_sync_user';
  const internal=new Set();let timer=0,running=false,ready=false;
  const read=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch{return d}};
  const write=(k,v)=>{internal.add(k);localStorage.setItem(k,JSON.stringify(v));internal.delete(k)};
  async function getUser(){try{const r=await window.wdompetSupabase.auth.getUser();return r?.data?.user||null}catch{return null}}
  async function loadRemote(user){const s=window.wdompetSupabase,out={};for(const n of ['sumber_dana','transaksi','transfer','anggaran']){const r=await s.from(n).select('*').eq('user_id',user.id);if(r.error)throw r.error;out[n]=r.data||[]}return out}
  function localBudgets(){const b={};Object.keys(localStorage).filter(k=>k.startsWith(BUDGET+'_')).forEach(k=>b[k.slice(BUDGET.length+1)]=Number(localStorage.getItem(k))||0);return b}
  function remoteToLocal(r){
    const funds=(r.sumber_dana||[]).map(x=>({id:x.client_id||String(x.id),name:x.name,type:x.type,openingBalance:Number(x.opening_balance)||0,masked:x.masked||'',active:x.active!==false,created:new Date(x.created_at||Date.now()).getTime()}));
    const tx=(r.transaksi||[]).map(x=>({id:x.client_id||String(x.id),type:x.type,date:x.date,category:x.category||'',note:x.note||'',amount:Number(x.amount)||0,fundId:(r.sumber_dana||[]).find(f=>f.id===x.fund_id)?.client_id||'',created:new Date(x.created_at||Date.now()).getTime()}));
    const transfers=(r.transfer||[]).map(x=>({id:x.client_id||String(x.id),date:x.date,fromFundId:(r.sumber_dana||[]).find(f=>f.id===x.from_fund_id)?.client_id||'',toFundId:(r.sumber_dana||[]).find(f=>f.id===x.to_fund_id)?.client_id||'',amount:Number(x.amount)||0,note:x.note||'',created:new Date(x.created_at||Date.now()).getTime()}));
    const budgets={};(r.anggaran||[]).forEach(x=>budgets[String(x.month).slice(0,7)]=Number(x.amount)||0);return{funds,tx,transfers,budgets}
  }
  async function pushLocal(user){
    const s=window.wdompetSupabase,localFunds=read(FUNDS),localTx=read(KEY),localTransfers=read(TRANSFERS),budgets=localBudgets();
    const fundRows=localFunds.map(f=>({user_id:user.id,client_id:String(f.id),name:f.name,type:f.type,opening_balance:Number(f.openingBalance)||0,masked:f.masked||'',active:f.active!==false}));
    if(fundRows.length){const r=await s.from('sumber_dana').upsert(fundRows,{onConflict:'user_id,client_id'});if(r.error)throw r.error}
    const fr=await s.from('sumber_dana').select('id,client_id').eq('user_id',user.id);if(fr.error)throw fr.error;const fmap=new Map((fr.data||[]).map(x=>[String(x.client_id),x.id]));
    const txRows=localTx.map(x=>({user_id:user.id,client_id:String(x.id),fund_id:fmap.get(String(x.fundId))||null,category_id:null,date:x.date,type:x.type,category:x.category,note:x.note||'',amount:Number(x.amount)||0}));
    if(txRows.length){const r=await s.from('transaksi').upsert(txRows,{onConflict:'user_id,client_id'});if(r.error)throw r.error}
    const trRows=localTransfers.map(x=>({user_id:user.id,client_id:String(x.id),from_fund_id:fmap.get(String(x.fromFundId)),to_fund_id:fmap.get(String(x.toFundId)),date:x.date,amount:Number(x.amount)||0,note:x.note||''})).filter(x=>x.from_fund_id&&x.to_fund_id);
    if(trRows.length){const r=await s.from('transfer').upsert(trRows,{onConflict:'user_id,client_id'});if(r.error)throw r.error}
    const budgetRows=Object.entries(budgets).filter(([m])=>/^\d{4}-\d{2}$/.test(m)).map(([m,a])=>({user_id:user.id,client_id:m,month:m+'-01',amount:Math.max(0,a)}));
    if(budgetRows.length){const r=await s.from('anggaran').upsert(budgetRows,{onConflict:'user_id,client_id'});if(r.error)throw r.error}
    const remote=await loadRemote(user),del=async(table,rows,ids)=>{const keep=new Set(ids.map(String));for(const row of rows){if(row.client_id&&!keep.has(String(row.client_id))){const r=await s.from(table).delete().eq('user_id',user.id).eq('client_id',row.client_id);if(r.error)throw r.error}}};
    await del('transaksi',remote.transaksi,localTx.map(x=>x.id));await del('transfer',remote.transfer,localTransfers.map(x=>x.id));await del('anggaran',remote.anggaran,Object.keys(budgets));await del('sumber_dana',remote.sumber_dana,localFunds.map(x=>x.id));
  }
  async function resetData(){
    if(!window.wdompetSupabase)return false;
    const user=await getUser();if(!user)throw new Error('Sesi login tidak ditemukan.');
    const ok=window.confirm('RESET SEMUA DATA KEUANGAN?\n\nSemua transaksi, transfer, anggaran, sumber dana, dan kategori milik akun ini akan dihapus permanen. Akun/login tetap dipertahankan.');
    if(!ok)return false;
    const s=window.wdompetSupabase;
    for(const table of ['transaksi','transfer','anggaran','sumber_dana','kategori']){
      const r=await s.from(table).delete().eq('user_id',user.id);if(r.error)throw r.error;
    }
    [KEY,FUNDS,TRANSFERS,OWNER].forEach(k=>{internal.add(k);localStorage.removeItem(k);internal.delete(k)});
    Object.keys(localStorage).filter(k=>k.startsWith(BUDGET+'_')).forEach(k=>{internal.add(k);localStorage.removeItem(k);internal.delete(k)});
    ready=false;
    location.reload();
    return true;
  }
  window.wdompetResetData=resetData;
  async function initialSync(){
    if(running||ready||!window.wdompetSupabase)return;running=true;
    try{const user=await getUser();if(!user)return;const remote=await loadRemote(user),localFunds=read(FUNDS),localTx=read(KEY),localTransfers=read(TRANSFERS),budgets=localBudgets(),remoteEmpty=!remote.sumber_dana.length&&!remote.transaksi.length&&!remote.transfer.length&&!remote.anggaran.length,previousOwner=localStorage.getItem(OWNER);
      if(remoteEmpty&&(!previousOwner||previousOwner===user.id)&&(localFunds.length||localTx.length||localTransfers.length||Object.keys(budgets).length)){await pushLocal(user)}
      else {const data=remoteToLocal(remote);write(FUNDS,data.funds);write(KEY,data.tx);write(TRANSFERS,data.transfers);Object.keys(localStorage).filter(k=>k.startsWith(BUDGET+'_')).forEach(k=>{internal.add(k);localStorage.removeItem(k);internal.delete(k)});Object.entries(data.budgets).forEach(([m,a])=>{internal.add(BUDGET+'_'+m);localStorage.setItem(BUDGET+'_'+m,String(a));internal.delete(BUDGET+'_'+m)})}
      localStorage.setItem(OWNER,user.id);ready=true;if(typeof initMonths==='function')initMonths();if(typeof render==='function')render();if(typeof renderFunds==='function')renderFunds();
    }catch(e){console.error('WDompet Supabase initial sync:',e);ready=false}finally{running=false}}
  async function syncChanges(){if(running||!window.wdompetSupabase)return;running=true;try{const user=await getUser();if(user){await pushLocal(user);localStorage.setItem(OWNER,user.id);ready=true}}catch(e){console.error('WDompet Supabase save:',e)}finally{running=false}}
  function schedule(){clearTimeout(timer);timer=setTimeout(()=>{if(ready)syncChanges();else initialSync()},500)}
  const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){original.call(this,k,v);if(!internal.has(k)&&(k===KEY||k===FUNDS||k===TRANSFERS||k.startsWith(BUDGET+'_')))schedule()};
  if(window.wdompetAuthReady)window.wdompetAuthReady.then(initialSync);else setTimeout(initialSync,800);
  window.addEventListener('wdompet-auth-ready',initialSync);
})();