# WDompet

Aplikasi keuangan frontend berbasis HTML, CSS, dan JavaScript.

## V2.4.5
V2 memakai halaman HTML terpisah yang berbagi `style.css` dan `app.js`.

Halaman:
- `v2/index.html` — Beranda / Dashboard
- `v2/transaksi.html` — Transaksi
- `v2/tambah.html` — Tambah/Edit Transaksi
- `v2/anggaran.html` — Anggaran
- `v2/laporan.html` — Laporan
- `v2/sumber-dana.html` — Sumber Dana & Transfer

Semua halaman menggunakan tema visual yang sama. Dashboard menjadi pusat pengaturan tema; pilihan light/dark disimpan pada `localStorage` sehingga halaman lain mengikuti tema yang sama.

Navigasi:
- Desktop menggunakan sidebar vertikal.
- Mobile menggunakan navbar horizontal di bagian bawah dengan urutan yang sama seperti desktop.
- Beranda, Transaksi, Anggaran, Laporan, dan Sumber Dana hanya menggunakan teks.
- Tambah hanya menggunakan tombol `＋` tanpa teks.

Data V2 disimpan pada localStorage browser dan disinkronkan antar halaman/tab melalui event `storage`.

Fitur:
- Pemasukan dan pengeluaran
- Edit dan hapus transaksi
- Sumber dana: Bank, E-Wallet, Tunai, Lainnya
- Saldo sumber dana otomatis
- Transfer antar sumber dana dengan validasi saldo
- Anggaran per periode
- Laporan dan grafik arus kas
- Export CSV
- Dark/light theme terpusat dari Dashboard
- Layout responsive desktop dan mobile

## Aturan versi
Setiap perubahan atau perbaikan wajib menaikkan versi. Versi saat ini `V2.4.5`; patch berikutnya menjadi `V2.4.6`.

## GitHub Pages
V2 dapat dibuka dari folder `v2/` pada GitHub Pages.

> V2 belum menggunakan database/server. Data tersimpan lokal pada browser/perangkat dan tidak otomatis dibagikan ke perangkat lain.
