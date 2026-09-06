<?php
declare(strict_types=1);

// Gunakan environment variable pada hosting produksi.
const DB_HOST = '127.0.0.1';
const DB_PORT = '3306';
const DB_NAME = 'wdompet';
const DB_USER = 'root';
const DB_PASS = '';

// Origin frontend yang diizinkan mengakses API.
const APP_ORIGIN = 'https://jsuryanaads.github.io';
const APP_NAME = 'WDompet Backend';
const TOKEN_TTL_DAYS = 30;
