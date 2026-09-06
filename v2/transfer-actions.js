(function(){
  const KEY='wdompet_v2_transfers';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const money=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(n)||0);
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
  function render(){
    const form=document.querySelector('.transfer-form');if(!form)return;
    let box=document.getElementById('transferList');
    if(!box){box=document.createElement('div');box.id='transferList';box.className='transfer-history';form.after(box)}
    const rows=read();
    const funds=()=>{try{return JSON.parse(localStorage.getItem('wdompet_v2_funds')||'[]')}catch{return[]}};
    const fs=funds(),name=id=>fs.find(f=>f.id===id)?.name||'-';
    box.innerHTML='<h2>Riwayat Transfer</h2>'+(rows.length?'<div class="fund-table"><table><thead><tr><th>Tanggal</th><th>Dari</th><th>Ke</th><th>Nominal</th><th>Keterangan</th><th>Aksi</th></tr></thead><tbody>'+rows.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.created)-Number(a.created)).map(x=>`<tr><td>${esc(new Date(x.date+'T00:00:00').toLocaleDateString('id-ID'))}</td><td>${esc(name(x.fromFundId))}</td><td>${esc(name(x.toFundId))}</td><td><b>${money(x.amount)}</b></td><td>${esc(x.note||'-')}</td><td><button class="fund-del transfer-del" data-id="${esc(x.id)}">Hapus</button></td></tr>`).join('')+'</tbody></table></div>':'<p class="fund-empty">Belum ada transfer.</p>');
  }
  document.addEventListener('click',e=>{const b=e.target.closest('.transfer-del');if(!b)return;if(!confirm('Hapus transfer ini?'))return;const rows=read().filter(x=>x.id!==b.dataset.id);localStorage.setItem(KEY,JSON.stringify(rows));location.reload()});
  document.addEventListener('DOMContentLoaded',render);setTimeout(render,900);
})();
