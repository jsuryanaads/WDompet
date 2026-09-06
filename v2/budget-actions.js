(function(){
  const BUDGET='wdompet_v2_budget';
  const key=()=>BUDGET+'_'+(document.getElementById('monthFilter')?.value||'');
  function syncButton(){
    const btn=document.getElementById('deleteBudget');
    if(!btn)return;
    const value=Number(localStorage.getItem(key())||0);
    btn.disabled=!value;
    btn.textContent=value?'Hapus Anggaran':'Tidak Ada Anggaran';
  }
  async function deleteRemote(month){
    try{
      const client=window.wdompetSupabase;
      if(!client)return;
      const {data:{user}}=await client.auth.getUser();
      if(!user)return;
      const {error}=await client.from('anggaran').delete().eq('user_id',user.id).eq('month',month+'-01');
      if(error)throw error;
    }catch(err){
      console.error('Gagal menghapus anggaran di Supabase:',err);
      alert('Anggaran lokal dihapus, tetapi sinkronisasi ke server gagal. Coba lagi saat koneksi tersedia.');
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const month=document.getElementById('monthFilter');
    const save=document.getElementById('saveBudget');
    if(month)month.addEventListener('change',()=>setTimeout(syncButton,0));
    if(save)save.addEventListener('click',()=>setTimeout(syncButton,0));
    const btn=document.getElementById('deleteBudget');
    if(btn)btn.addEventListener('click',async()=>{
      const k=key(),value=Number(localStorage.getItem(k)||0),monthValue=month?.value||'';
      if(!value)return;
      if(!confirm('Hapus anggaran untuk periode ini?'))return;
      btn.disabled=true;
      await deleteRemote(monthValue);
      localStorage.removeItem(k);
      if(typeof render==='function')render();
      syncButton();
    });
    setTimeout(syncButton,1000);
  });
})();
