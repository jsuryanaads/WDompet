<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/auth.php';

$user = require_auth();
$pdo = db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $from = $_GET['from'] ?? null;
    $to = $_GET['to'] ?? null;
    $sql = 'SELECT t.id,t.type,t.amount,t.transaction_date AS date,t.note,t.fund_id AS fundId,t.category_id AS categoryId,
                   k.name AS category,f.name AS fundName,t.created_at AS created
            FROM transaksi t
            LEFT JOIN kategori k ON k.id=t.category_id
            LEFT JOIN sumber_dana f ON f.id=t.fund_id
            WHERE t.user_id=?';
    $params = [$user['id']];
    if ($from) { $sql .= ' AND t.transaction_date>=?'; $params[]=$from; }
    if ($to) { $sql .= ' AND t.transaction_date<=?'; $params[]=$to; }
    $sql .= ' ORDER BY t.transaction_date DESC,t.id DESC';
    $stmt=$pdo->prepare($sql);$stmt->execute($params);
    json_response(['ok'=>true,'data'=>$stmt->fetchAll()]);
}

if ($method === 'POST') {
    $d=input_json();
    $type=$d['type']??'';$amount=(float)($d['amount']??0);$date=$d['date']??'';
    if (!in_array($type,['income','expense'],true)||$amount<=0||!preg_match('/^\d{4}-\d{2}-\d{2}$/',$date))
        json_response(['ok'=>false,'message'=>'Data transaksi tidak valid.'],422);
    $stmt=$pdo->prepare('INSERT INTO transaksi(user_id,fund_id,category_id,type,amount,transaction_date,note) VALUES(?,?,?,?,?,?,?)');
    $stmt->execute([$user['id'],$d['fundId']??null,$d['categoryId']??null,$type,$amount,$date,trim((string)($d['note']??''))]);
    json_response(['ok'=>true,'id'=>(int)$pdo->lastInsertId()],201);
}

if ($method === 'PUT') {
    $d=input_json();$id=(int)($d['id']??0);$amount=(float)($d['amount']??0);$type=$d['type']??'';$date=$d['date']??'';
    if($id<=0||!in_array($type,['income','expense'],true)||$amount<=0||!preg_match('/^\d{4}-\d{2}-\d{2}$/',$date)) json_response(['ok'=>false,'message'=>'Data transaksi tidak valid.'],422);
    $stmt=$pdo->prepare('UPDATE transaksi SET fund_id=?,category_id=?,type=?,amount=?,transaction_date=?,note=? WHERE id=? AND user_id=?');
    $stmt->execute([$d['fundId']??null,$d['categoryId']??null,$type,$amount,$date,trim((string)($d['note']??'')),$id,$user['id']]);
    json_response(['ok'=>true,'updated'=>$stmt->rowCount()]);
}

if ($method === 'DELETE') {
    $id=(int)($_GET['id']??0);if($id<=0)json_response(['ok'=>false,'message'=>'ID tidak valid.'],422);
    $stmt=$pdo->prepare('DELETE FROM transaksi WHERE id=? AND user_id=?');$stmt->execute([$id,$user['id']]);
    json_response(['ok'=>true,'deleted'=>$stmt->rowCount()]);
}

json_response(['ok'=>false,'message'=>'Method tidak didukung.'],405);
