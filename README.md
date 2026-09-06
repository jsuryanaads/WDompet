# WDompet

Aplikasi keuangan frontend berbasis HTML, CSS, dan JavaScript.

## V2.4.8
V2 memakai halaman HTML terpisah yang berbagi `style.css` dan `app.js`.

Halaman:
- `v2/index.html` — Beranda / Dashboard
- `v2/transaksi.html` — Transaksi
- `v2/tambah.html` — Tambah/Edit Transaksi
- `v2/anggaran.html` — Anggaran
- `v2/laporan.html` — Laporan
- `v2/sumber-dana.html` — Sumber Dana & Transfer

Semua halaman menggunakan tema visual yang sama. Tombol tema tersedia pada header seluruh halaman dan pilihan light/dark disimpan pada `localStorage`, sehingga halaman lain mengikuti tema yang sama.

Navigasi:
- Desktop menggunakan sidebar vertikal di kiri.
- Mobile juga menggunakan sidebar vertikal di kiri dengan lebar yang disesuaikan untuk layar kecil.
- Urutan navigasi tetap: Beranda, Transaksi, ＋, Anggaran, Laporan, Sumber Dana.
- Beranda, Transaksi, Anggaran, Laporan, dan Sumber Dana hanya menggunakan teks.
- Tambah hanya menggunakan tombol `＋` tanpa teks.

Data V2 disimpan pada localStorage browser dan disinkronkan antar halaman/tab melalui event `storage`.

Perbaikan V2.4.8:
- Memperbaiki layout mobile agar navbar benar-benar menjadi sidebar kiri, bukan navbar horizontal.
- Menambahkan tombol tema pada seluruh halaman V2 sehingga dapat digunakan dari desktop maupun mobile.
- Menyamakan label versi menjadi V2.4.8 pada halaman V2.
- Mempertahankan pilihan sumber dana saat daftar sumber dana dirender ulang.
- Mempertahankan pilihan periode saat daftar bulan diperbarui.
- Mempertahankan integrasi transaksi, sumber dana, transfer, anggaran, laporan, dan dashboard pada localStorage yang sama.
- Mempertahankan layout responsive dan dark/light theme.

Fitur:
- Pemasukan dan pengeluaran
- Edit dan hapus transaksi
- Sumber dana: Bank, E-Wallet, Tunai, Lainnya
- Saldo sumber dana otomatis
- Transfer antar sumber dana dengan validasi saldo
- Anggaran per periode
- Laporan dan grafik arus kas
- Export CSV
- Dark/light theme
- Sidebar kiri desktop dan mobile
- Layout responsive desktop dan mobile

## Aturan versi
Setiap perubahan atau perbaikan wajib menaikkan versi. Versi saat ini `V2.4.8`; patch berikutnya menjadi `V2.4.9`.

## GitHub Pages
V2 dapat dibuka dari folder `v2/` pada GitHub Pages.

> V2 belum menggunakan database/server. Data tersimpan lokal pada browser/perangkat dan tidak otomatis dibagikan ke perangkat lain.
