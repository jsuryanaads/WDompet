<?php
declare(strict_types=1);
require_once __DIR__ . '/../lib/auth.php';
$user=require_auth();$pdo=db();$method=$_SERVER['REQUEST_METHOD'];
if($method==='GET'){$s=$pdo->prepare('SELECT id,name,type,opening_balance AS openingBalance,masked,active,created_at AS created FROM sumber_dana WHERE user_id=? ORDER BY name');$s->execute([$user['id']]);json_response(['ok'=>true,'data'=>$s->fetchAll()]);}
if($method==='POST'){$d=input_json();$name=trim((string)($d['name']??''));$type=$d['type']??'other';$opening=(float)($d['openingBalance']??0);if($name===''||!in_array($type,['bank','ewallet','cash','other'],true))json_response(['ok'=>false,'message'=>'Data sumber dana tidak valid.'],422);$s=$pdo->prepare('INSERT INTO sumber_dana(user_id,name,type,opening_balance,masked) VALUES(?,?,?,?,?)');$s->execute([$user['id'],$name,$type,$opening,trim((string)($d['masked']??''))]);json_response(['ok'=>true,'id'=>(int)$pdo->lastInsertId()],201);}
if($method==='PUT'){$d=input_json();$id=(int)($d['id']??0);$name=trim((string)($d['name']??''));$type=$d['type']??'other';if($id<=0||$name===''||!in_array($type,['bank','ewallet','cash','other'],true))json_response(['ok'=>false,'message'=>'Data tidak valid.'],422);$s=$pdo->prepare('UPDATE sumber_dana SET name=?,type=?,opening_balance=?,masked=?,active=? WHERE id=? AND user_id=?');$s->execute([$name,$type,(float)($d['openingBalance']??0),trim((string)($d['masked']??'')),(int)($d['active']??1),$id,$user['id']]);json_response(['ok'=>true,'updated'=>$s->rowCount()]);}
if($method==='DELETE'){$id=(int)($_GET['id']??0);$s=$pdo->prepare('DELETE FROM sumber_dana WHERE id=? AND user_id=?');$s->execute([$id,$user['id']]);json_response(['ok'=>true,'deleted'=>$s->rowCount()]);}
json_response(['ok'=>false,'message'=>'Method tidak didukung.'],405);
