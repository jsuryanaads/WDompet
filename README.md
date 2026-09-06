# WDompet

Aplikasi keuangan frontend berbasis HTML, CSS, dan JavaScript.

## V2.4.9
Audit difokuskan pada versi desktop tanpa mengubah V1.

Perbaikan desktop:
- Sidebar kiri desktop dipertahankan sebagai navigasi utama.
- Tombol tema tersedia pada seluruh halaman V2.
- Dashboard desktop menggunakan layout dua kolom untuk saldo dan statistik, kemudian grafik dan analisis penuh.
- Form Tambah Transaksi standalone diperbaiki agar menjadi dua kolom pada desktop.
- Progress Anggaran standalone diperbaiki agar memiliki track dan indikator yang terlihat jelas.
- Struktur Dashboard diperiksa dan diperbaiki agar markup panel Insight tetap valid.
- Versi seluruh halaman V2 diseragamkan menjadi V2.4.9.

Halaman:
- `v2/index.html` — Beranda / Dashboard
- `v2/transaksi.html` — Transaksi
- `v2/tambah.html` — Tambah/Edit Transaksi
- `v2/anggaran.html` — Anggaran
- `v2/laporan.html` — Laporan
- `v2/sumber-dana.html` — Sumber Dana & Transfer

Navigasi desktop:
- Sidebar vertikal di kiri.
- Urutan: Beranda, Transaksi, ＋, Anggaran, Laporan, Sumber Dana.
- Beranda, Transaksi, Anggaran, Laporan, dan Sumber Dana hanya menggunakan teks.
- Tambah hanya menggunakan tombol `＋` tanpa teks.
- Tombol tema tersedia pada header setiap halaman.

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
- Dark/light theme
- Sidebar kiri desktop dan mobile
- Layout responsive desktop dan mobile

## Aturan versi
Setiap perubahan atau perbaikan wajib menaikkan versi. Versi saat ini `V2.4.9`; patch berikutnya menjadi `V2.4.10`.

## GitHub Pages
V2 dapat dibuka dari folder `v2/` pada GitHub Pages.

> V2 belum menggunakan database/server. Data tersimpan lokal pada browser/perangkat dan tidak otomatis dibagikan ke perangkat lain.
