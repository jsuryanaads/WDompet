<?php
declare(strict_types=1);

// Production: simpan kredensial di environment variable, bukan di repository publik.
const DB_HOST = '127.0.0.1';
const DB_PORT = '3306';
const DB_NAME = 'wdompet';
const DB_USER = 'root';
const DB_PASS = '';

// Ganti dengan origin frontend saat backend sudah online.
const APP_ORIGIN = 'https://jsuryanaads.github.io';
const APP_NAME = 'WDompet Backend';
const TOKEN_TTL_DAYS = 30;
