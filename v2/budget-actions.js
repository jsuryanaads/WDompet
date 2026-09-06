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
  document.addEventListener('DOMContentLoaded',()=>{
    const month=document.getElementById('monthFilter');
    const save=document.getElementById('saveBudget');
    if(month)month.addEventListener('change',()=>setTimeout(syncButton,0));
    if(save)save.addEventListener('click',()=>setTimeout(syncButton,0));
    const btn=document.getElementById('deleteBudget');
    if(btn)btn.addEventListener('click',()=>{
      const k=key(),value=Number(localStorage.getItem(k)||0);
      if(!value)return;
      if(!confirm('Hapus anggaran untuk periode ini?'))return;
      localStorage.removeItem(k);
      if(typeof render==='function')render();
      syncButton();
    });
    setTimeout(syncButton,1000);
  });
})();
