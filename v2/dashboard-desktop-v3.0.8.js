/* WDompet V3.0.8 - desktop dashboard data widgets */
(function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>'Rp'+Number(n||0).toLocaleString('id-ID');
  const get=()=>window.wdompetGetData?.()||{funds:[],tx:[],budgets:{}};
  const value=(o,keys)=>{for(const k of keys){if(o&&o[k]!==undefined&&o[k]!==null&&o[k]!=='')return o[k]}return ''};
  function render(){
    const d=get(), funds=Array.isArray(d.funds)?d.funds:[], tx=Array.isArray(d.tx)?d.tx:[];
    const fundGrid=document.getElementById('fundGrid'), totalEl=document.getElementById('fundTotal');
    if(fundGrid){
      if(!funds.length) fundGrid.innerHTML='<div class="desktop-empty">Belum ada sumber dana.</div>';
      else {
        const total=funds.reduce((s,f)=>s+Number(value(f,['balance','saldo','amount','nominal'])||0),0);
        const max=Math.max(total,...funds.map(f=>Number(value(f,['balance','saldo','amount','nominal'])||0)),1);
        fundGrid.innerHTML=funds.slice(0,6).map((f,i)=>{const name=value(f,['name','nama','title'])||'Sumber Dana';const bal=Number(value(f,['balance','saldo','amount','nominal'])||0);return `<article class="fund-card"><div class="fund-top"><div class="fund-icon">${esc(name.slice(0,1).toUpperCase())}</div><div class="fund-name">${esc(name)}</div></div><div class="fund-balance">${money(bal)}</div><div class="fund-bar"><i style="width:${Math.round((bal/max)*100)}%"></i></div></article>`}).join('');
        if(totalEl) totalEl.textContent=money(total);
      }
    }
    const recent=document.getElementById('recentTxBody');
    if(recent){
      const rows=tx.slice().sort((a,b)=>String(value(b,['date','tanggal'])) .localeCompare(String(value(a,['date','tanggal'])))).slice(0,5);
      recent.innerHTML=rows.length?rows.map(t=>{const type=String(value(t,['type','jenis'])).toLowerCase();const amount=Number(value(t,['amount','jumlah','nominal'])||0);return `<tr><td>${esc(value(t,['date','tanggal']))}</td><td>${esc(value(t,['description','deskripsi','name'])||'-')}</td><td>${esc(value(t,['category','kategori'])||'-')}</td><td>${type.includes('masuk')||type==='income'||type==='pemasukan'?'<span class="amount-in">Pemasukan</span>':'<span class="amount-out">Pengeluaran</span>'}</td><td class="${type.includes('masuk')||type==='income'||type==='pemasukan'?'amount-in':'amount-out'}">${money(amount)}</td></tr>`}).join(''):'<tr><td colspan="5" class="desktop-empty">Belum ada transaksi.</td></tr>';
    }
    const budgetBox=document.getElementById('budgetRows');
    if(budgetBox){
      const raw=d.budgets||{}; const arr=Array.isArray(raw)?raw:Object.values(raw);
      budgetBox.innerHTML=arr.slice(0,6).map(b=>{const name=value(b,['category','kategori','name'])||'Anggaran';const limit=Number(value(b,['limit','amount','anggaran','budget'])||0);const used=Number(value(b,['used','terpakai','spent','realisasi'])||0);const pct=limit?Math.min(100,Math.round(used/limit*100)):0;return `<div class="budget-row"><span class="budget-label">${esc(name)}</span><span>${money(limit)}</span><span>${money(used)}</span><span class="progress"><i style="width:${pct}%"></i></span><b>${pct}%</b></div>`}).join('')||'<div class="desktop-empty">Belum ada anggaran.</div>';
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{render();window.addEventListener('wdompet:updated',render);window.addEventListener('wdompet:synced',render);setTimeout(render,700)});
})();
