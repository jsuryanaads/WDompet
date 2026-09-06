<?php
declare(strict_types=1);
require_once __DIR__ . '/../lib/auth.php';
$user=require_auth();$pdo=db();$method=$_SERVER['REQUEST_METHOD'];
if($method==='GET'){$period=$_GET['period']??date('Y-m');$s=$pdo->prepare('SELECT id,period,amount FROM anggaran WHERE user_id=? AND period=? LIMIT 1');$s->execute([$user['id'],$period]);$row=$s->fetch();json_response(['ok'=>true,'data'=>$row?:['period'=>$period,'amount'=>0]]);}
if($method==='POST'||$method==='PUT'){$d=input_json();$period=(string)($d['period']??date('Y-m'));$amount=(float)($d['amount']??0);if(!preg_match('/^\d{4}-\d{2}$/',$period)||$amount<0)json_response(['ok'=>false,'message'=>'Data anggaran tidak valid.'],422);$s=$pdo->prepare('INSERT INTO anggaran(user_id,period,amount) VALUES(?,?,?) ON DUPLICATE KEY UPDATE amount=VALUES(amount)');$s->execute([$user['id'],$period,$amount]);json_response(['ok'=>true,'period'=>$period,'amount'=>$amount]);}
json_response(['ok'=>false,'message'=>'Method tidak didukung.'],405);
