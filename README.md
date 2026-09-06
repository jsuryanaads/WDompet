# WDompet

Aplikasi keuangan frontend berbasis HTML, CSS, dan JavaScript.

## V2.5.0
Redesign visual besar berdasarkan acuan desain dashboard WDompet: sidebar navy, logo dompet dengan koin, kartu finansial rounded, gradasi biru-toska, typography yang lebih tegas, dan layout desktop/mobile yang konsisten.

Perubahan penting:
- Logo WDompet baru berupa ikon dompet dengan koin dan ditempatkan di sidebar.
- Seluruh halaman V2 menggunakan branding sidebar yang sama.
- Visual dashboard diselaraskan dengan acuan desain: navy sidebar, white/light-blue canvas, rounded cards, soft shadow, dan gradient finansial.
- Tombol Tema ditempatkan konsisten di bagian bawah sidebar.
- Halaman Transaksi, Tambah/Edit, Anggaran, Laporan, dan Sumber Dana mengikuti sistem visual yang sama.
- Responsive desktop dan mobile diaudit agar struktur sidebar tetap konsisten.
- Fungsi transaksi, anggaran, laporan, sumber dana, transfer, export CSV, dan theme localStorage tetap menggunakan `app.js` yang sama.

Halaman:
- `v2/index.html` — Beranda / Dashboard
- `v2/transaksi.html` — Transaksi
- `v2/tambah.html` — Tambah/Edit Transaksi
- `v2/anggaran.html` — Anggaran
- `v2/laporan.html` — Laporan
- `v2/sumber-dana.html` — Sumber Dana & Transfer

Asset visual:
- `v2/wdompet-logo.svg` — Logo resmi WDompet versi baru
- `v2/theme-redesign.css` — Override visual untuk implementasi desain referensi

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
Versi hanya dinaikkan untuk perubahan besar atau penting yang memengaruhi fitur, struktur, desain utama, data model, keamanan, atau alur kerja aplikasi. Perbaikan kecil seperti typo, spacing, atau bug minor cukup dicatat melalui commit tanpa menaikkan versi.

Versi saat ini: `V2.5.0`.

## GitHub Pages
V2 dapat dibuka dari folder `v2/` pada GitHub Pages.

> V2 belum menggunakan database/server. Data tersimpan lokal pada browser/perangkat dan tidak otomatis dibagikan ke perangkat lain.
