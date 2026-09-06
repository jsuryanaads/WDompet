const KEY='keuanganku_v1_transactions';
const $=id=>document.getElementById(id);
let transactions=JSON.parse(localStorage.getItem(KEY)||'[]');
const now=new Date();
const today=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
$('date').value=today;
function rupiah(n){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(n)||0)}
function save(){localStorage.setItem(KEY,JSON.stringify(transactions));render()}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function resetForm(){ $('transactionForm').reset(); $('editId').value=''; $('date').value=today; $('formTitle').textContent='Tambah Transaksi'; $('formHelp').textContent='Catat pemasukan atau pengeluaran.'; $('saveBtn').textContent='+ Simpan Transaksi'; $('cancelEdit').style.display='none'; }
function editTransaction(id){const t=transactions.find(x=>x.id===id);if(!t)return;$('editId').value=t.id;$('type').value=t.type;$('date').value=t.date;$('category').value=t.category;$('note').value=t.note||'';$('amount').value=t.amount;$('formTitle').textContent='Edit Transaksi';$('formHelp').textContent='Perbaiki data transaksi lalu simpan perubahan.';$('saveBtn').textContent='Simpan Perubahan';$('cancelEdit').style.display='inline-block';document.getElementById('transactionForm').scrollIntoView({behavior:'smooth',block:'start'})}
function removeTransaction(id){if(confirm('Hapus transaksi ini?')){transactions=transactions.filter(t=>t.id!==id);save()}}
function render(){
  const income=transactions.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0);
  const expense=transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount),0);
  $('balance').textContent=rupiah(income-expense);$('income').textContent=rupiah(income);$('expense').textContent=rupiah(expense);
  $('count').textContent=transactions.length;$('incomeCount').textContent=transactions.filter(t=>t.type==='income').length;$('expenseCount').textContent=transactions.filter(t=>t.type==='expense').length;
  const q=$('search').value.toLowerCase();
  const rows=transactions.filter(t=>[t.date,t.category,t.note,t.type].join(' ').toLowerCase().includes(q)).sort((a,b)=>b.date.localeCompare(a.date)||(b.created||0)-(a.created||0));
  $('transactionList').innerHTML=rows.map(t=>`<tr><td>${new Date(t.date+'T00:00:00').toLocaleDateString('id-ID')}</td><td><span class="badge ${t.type}">${t.type==='income'?'Pemasukan':'Pengeluaran'}</span></td><td>${escapeHtml(t.category)}</td><td>${escapeHtml(t.note||'-')}</td><td class="${t.type==='income'?'amount-income':'amount-expense'}">${t.type==='income'?'+':'-'} ${rupiah(t.amount)}</td><td class="actions"><button class="edit" data-edit="${escapeHtml(t.id)}">Edit</button><button class="delete" data-delete="${escapeHtml(t.id)}">Hapus</button></td></tr>`).join('');
  $('empty').style.display=rows.length?'none':'block';
}
$('transactionForm').addEventListener('submit',e=>{e.preventDefault();const amount=Number($('amount').value);if(!Number.isFinite(amount)||amount<=0)return alert('Nominal tidak valid.');const id=$('editId').value;if(id){const t=transactions.find(x=>x.id===id);if(t)Object.assign(t,{type:$('type').value,date:$('date').value,category:$('category').value,note:$('note').value.trim(),amount})}else{transactions.push({id:crypto.randomUUID?crypto.randomUUID():Date.now().toString(),type:$('type').value,date:$('date').value,category:$('category').value,note:$('note').value.trim(),amount,created:Date.now()})}save();resetForm()});
$('cancelEdit').addEventListener('click',resetForm);
$('search').addEventListener('input',render);
$('transactionList').addEventListener('click',e=>{const edit=e.target.closest('[data-edit]'),del=e.target.closest('[data-delete]');if(edit)editTransaction(edit.dataset.edit);if(del)removeTransaction(del.dataset.delete)});
$('exportBtn').addEventListener('click',()=>{const header=['Tanggal','Jenis','Kategori','Keterangan','Nominal'];const lines=[header,...transactions.map(t=>[t.date,t.type==='income'?'Pemasukan':'Pengeluaran',t.category,t.note,t.amount])].map(r=>r.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\n');const blob=new Blob([lines],{type:'text/csv;charset=utf-8;'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='transaksi-keuangan.csv';a.click();URL.revokeObjectURL(a.href)});
render();