# WDompet Backend V3

Backend WDompet menggunakan **PHP 8+ + MySQL + PDO**.

> Catatan: GitHub Pages hanya menyajikan frontend statis dan tidak menjalankan PHP. Folder `backend/` ini adalah source backend dan harus ditempatkan pada hosting/server PHP + MySQL untuk dapat menjalankan API.

## Struktur

```text
backend/
├── api/
│   ├── auth.php
│   ├── dashboard.php
│   ├── transaksi.php
│   ├── sumber-dana.php
│   ├── anggaran.php
│   └── laporan.php
├── config/
│   ├── config.php
│   └── database.php
├── lib/
│   ├── auth.php
│   └── response.php
└── database.sql
```

## Instalasi

1. Buat database MySQL dengan menjalankan `database.sql`.
2. Salin `config/config.example.php` menjadi `config/config.php` jika file contoh tersedia, atau isi konfigurasi database secara langsung pada `config/config.php`.
3. Atur `APP_ORIGIN` ke alamat frontend WDompet.
4. Jalankan pada PHP 8+.
5. Uji endpoint `api/auth.php?action=health`.

## Keamanan

- PDO prepared statements.
- Password menggunakan `password_hash()`.
- Token autentikasi disimpan sebagai hash di database.
- Endpoint mengembalikan JSON.
- CORS dibatasi melalui `APP_ORIGIN`.
- Jangan commit kredensial database produksi ke repository publik.

## Status integrasi frontend

Frontend V2.5.0 masih menggunakan localStorage. Backend ini dibuat sebagai fondasi server-side; migrasi frontend ke API dilakukan setelah endpoint diuji pada hosting PHP + MySQL.
