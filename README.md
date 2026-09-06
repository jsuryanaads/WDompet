# WDompet

Aplikasi keuangan frontend berbasis HTML, CSS, dan JavaScript.

## V1
- Saldo, pemasukan, pengeluaran
- Tambah dan hapus transaksi
- Pencarian
- Export CSV
- Responsive
- localStorage

## V2.4.1
V2 memakai halaman HTML terpisah yang berbagi `style.css` dan `app.js`.

Halaman:
- `v2/index.html` — Beranda
- `v2/transaksi.html` — Transaksi
- `v2/tambah.html` — Tambah/Edit Transaksi
- `v2/anggaran.html` — Anggaran
- `v2/laporan.html` — Laporan
- `v2/sumber-dana.html` — Sumber Dana & Transfer

Data V2 disimpan pada localStorage browser dan disinkronkan antar halaman/tab melalui event `storage`.

Fitur V2.4.1:
- Pemasukan dan pengeluaran
- Edit dan hapus transaksi
- Sumber dana: Bank, E-Wallet, Tunai, Lainnya
- Saldo sumber dana otomatis
- Transfer antar sumber dana dengan validasi saldo
- Anggaran per periode
- Laporan dan grafik arus kas
- Export CSV
- Dark/light theme tersimpan di browser
- Layout responsive untuk desktop dan mobile

## Aturan versi
Setiap perubahan atau perbaikan wajib menaikkan versi. Patch berikutnya menjadi `V2.4.2`, lalu `V2.4.3`, dan seterusnya. Perubahan fitur besar dapat dinaikkan ke minor version berikutnya.

## GitHub Pages
V2 dapat dibuka dari folder `v2/` pada GitHub Pages.

> V2 belum menggunakan database/server. Data tersimpan lokal pada browser/perangkat dan tidak otomatis dibagikan ke perangkat lain.
