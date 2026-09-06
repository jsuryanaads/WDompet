<?php
declare(strict_types=1);
require_once __DIR__ . '/../lib/auth.php';
$user=require_auth();$pdo=db();
$from=$_GET['from']??date('Y-m-01');$to=$_GET['to']??date('Y-m-d');
if(!preg_match('/^\d{4}-\d{2}-\d{2}$/',$from)||!preg_match('/^\d{4}-\d{2}-\d{2}$/',$to))json_response(['ok'=>false,'message'=>'Periode tidak valid.'],422);
$s=$pdo->prepare("SELECT type,COALESCE(SUM(amount),0) total,COUNT(*) count FROM transaksi WHERE user_id=? AND transaction_date BETWEEN ? AND ? GROUP BY type");$s->execute([$user['id'],$from,$to]);$rows=$s->fetchAll();$income=0;$expense=0;foreach($rows as $r){if($r['type']==='income')$income=(float)$r['total'];if($r['type']==='expense')$expense=(float)$r['total'];}
$s=$pdo->prepare("SELECT COALESCE(k.name,'Lainnya') category,SUM(t.amount) total FROM transaksi t LEFT JOIN kategori k ON k.id=t.category_id WHERE t.user_id=? AND t.type='expense' AND t.transaction_date BETWEEN ? AND ? GROUP BY t.category_id,k.name ORDER BY total DESC");$s->execute([$user['id'],$from,$to]);
json_response(['ok'=>true,'period'=>['from'=>$from,'to'=>$to],'summary'=>['income'=>$income,'expense'=>$expense,'balance'=>$income-$expense],'categories'=>$s->fetchAll()]);
