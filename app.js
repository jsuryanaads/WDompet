const KEY='keuanganku_v1_transactions';
const $=id=>document.getElementById(id);
let transactions=JSON.parse(localStorage.getItem(KEY)||'[]');

const today=new Date().toISOString().slice(0,10);
$('date').value=today;

function rupiah(n){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n)}
function save(){localStorage.setItem(KEY,JSON.stringify(transactions));render()}
function render(){
  const income=transactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const expense=transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  $('balance').textContent=rupiah(income-expense);
  $('income').textContent=rupiah(income);
  $('expense').textContent=rupiah(expense);
  $('count').textContent=transactions.length;
  $('incomeCount').textContent=transactions.filter(t=>t.type==='income').length;
  $('expenseCount').textContent=transactions.filter(t=>t.type==='expense').length;

  const q=$('search').value.toLowerCase();
  const rows=transactions.filter(t=>[t.date,t.category,t.note,t.type].join(' ').toLowerCase().includes(q))
    .sort((a,b)=>b.date.localeCompare(a.date)||b.created-a.created);
  $('transactionList').innerHTML=rows.map(t=>`
    <tr>
      <td>${new Date(t.date+'T00:00:00').toLocaleDateString('id-ID')}</td>
      <td><span class="badge ${t.type}">${t.type==='income'?'Pemasukan':'Pengeluaran'}</span></td>
      <td>${escapeHtml(t.category)}</td>
      <td>${escapeHtml(t.note||'-')}</td>
      <td class="${t.type==='income'?'amount-income':'amount-expense'}">${t.type==='income'?'+':'-'} ${rupiah(t.amount)}</td>
      <td><button class="delete" onclick="removeTransaction('${t.id}')">Hapus</button></td>
    </tr>`).join('');
  $('empty').style.display=rows.length?'none':'block';
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function removeTransaction(id){
  if(confirm('Hapus transaksi ini?')){transactions=transactions.filter(t=>t.id!==id);save()}
}
$('transactionForm').addEventListener('submit',e=>{
  e.preventDefault();
  transactions.push({
    id:crypto.randomUUID?crypto.randomUUID():Date.now().toString(),
    type:$('type').value,date:$('date').value,category:$('category').value,
    note:$('note').value.trim(),amount:Number($('amount').value),created:Date.now()
  });
  e.target.reset();$('date').value=today;save();
});
$('search').addEventListener('input',render);
$('exportBtn').addEventListener('click',()=>{
  const header=['Tanggal','Jenis','Kategori','Keterangan','Nominal'];
  const lines=[header,...transactions.map(t=>[t.date,t.type==='income'?'Pemasukan':'Pengeluaran',t.category,t.note,t.amount])]
    .map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
  const blob=new Blob([lines],{type:'text/csv;charset=utf-8;'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='transaksi-keuangan.csv';a.click();URL.revokeObjectURL(a.href);
});
render();
