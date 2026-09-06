<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../lib/response.php';

$action = $_GET['action'] ?? 'health';

if ($action === 'health') {
    try { db()->query('SELECT 1'); json_response(['ok'=>true,'service'=>'WDompet Backend','database'=>'connected']); }
    catch (Throwable $e) { json_response(['ok'=>false,'service'=>'WDompet Backend','database'=>'error'],500); }
}

if ($action !== 'login' || $_SERVER['REQUEST_METHOD'] !== 'POST')
    json_response(['ok'=>false,'message'=>'Endpoint tidak ditemukan.'],404);

$data = input_json();
$email = trim((string)($data['email'] ?? ''));
$password = (string)($data['password'] ?? '');
if (!filter_var($email,FILTER_VALIDATE_EMAIL) || $password === '')
    json_response(['ok'=>false,'message'=>'Email dan password wajib diisi.'],422);

$stmt = db()->prepare('SELECT id,name,email,password_hash,role,active FROM users WHERE email=? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();
if (!$user || !(int)$user['active'] || !password_verify($password,$user['password_hash']))
    json_response(['ok'=>false,'message'=>'Email atau password salah.'],401);

$token = bin2hex(random_bytes(32));
$hash = hash('sha256',$token);
$expires = (new DateTimeImmutable('now'))->modify('+' . TOKEN_TTL_DAYS . ' days')->format('Y-m-d H:i:s');
$stmt = db()->prepare('INSERT INTO api_sessions (user_id,token_hash,expires_at) VALUES (?,?,?)');
$stmt->execute([$user['id'],$hash,$expires]);

json_response(['ok'=>true,'token'=>$token,'expires_at'=>$expires,'user'=>['id'=>(int)$user['id'],'name'=>$user['name'],'email'=>$user['email'],'role'=>$user['role']]]);
