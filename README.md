# WDompet

Aplikasi keuangan frontend berbasis HTML, CSS, dan JavaScript.

## V1
- Saldo, pemasukan, pengeluaran
- Tambah dan hapus transaksi
- Pencarian
- Export CSV
- Responsive
- localStorage

## V2.4.4
V2 memakai halaman HTML terpisah yang berbagi `style.css` dan `app.js`.

Halaman:
- `v2/index.html` — Beranda / Dashboard
- `v2/transaksi.html` — Transaksi
- `v2/tambah.html` — Tambah/Edit Transaksi
- `v2/anggaran.html` — Anggaran
- `v2/laporan.html` — Laporan
- `v2/sumber-dana.html` — Sumber Dana & Transfer

Data V2 disimpan pada localStorage browser dan disinkronkan antar halaman/tab melalui event `storage`.

Fitur V2.4.4:
- Pemasukan dan pengeluaran
- Edit dan hapus transaksi
- Sumber dana: Bank, E-Wallet, Tunai, Lainnya
- Saldo sumber dana otomatis
- Transfer antar sumber dana dengan validasi saldo
- Anggaran per periode
- Laporan dan grafik arus kas
- Export CSV
- Satu tombol Tema pada Dashboard menjadi sumber pengaturan tema untuk seluruh halaman
- Tema tersimpan di localStorage dan diterapkan otomatis saat halaman lain dibuka
- Navigasi 6 item sejajar: Beranda, Transaksi, Tambah, Anggaran, Laporan, Sumber Dana
- Hanya Tambah yang menggunakan ikon plus; item lainnya menggunakan teks
- Layout responsive untuk desktop dan mobile

## Aturan versi
Setiap perubahan atau perbaikan wajib menaikkan versi. Patch berikutnya menjadi `V2.4.5`, lalu `V2.4.6`, dan seterusnya. Perubahan fitur besar dapat dinaikkan ke minor version berikutnya.

## GitHub Pages
V2 dapat dibuka dari folder `v2/` pada GitHub Pages.

> V2 belum menggunakan database/server. Data tersimpan lokal pada browser/perangkat dan tidak otomatis dibagikan ke perangkat lain.
