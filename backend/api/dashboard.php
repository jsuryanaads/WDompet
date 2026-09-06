<?php
declare(strict_types=1);
require_once __DIR__ . '/../lib/auth.php';
$user=require_auth();$pdo=db();
$month=preg_match('/^\d{4}-\d{2}$/',$_GET['month']??'')?$_GET['month']:date('Y-m');
$s=$pdo->prepare("SELECT COALESCE(SUM(CASE WHEN type='income' THEN amount ELSE 0 END),0) income,COALESCE(SUM(CASE WHEN type='expense' THEN amount ELSE 0 END),0) expense,COUNT(*) transactions FROM transaksi WHERE user_id=? AND DATE_FORMAT(transaction_date,'%Y-%m')=?");$s->execute([$user['id'],$month]);$summary=$s->fetch();
$s=$pdo->prepare("SELECT COALESCE(SUM(CASE WHEN type='income' THEN amount ELSE -amount END),0) movement FROM transaksi WHERE user_id=?");$s->execute([$user['id']]);$movement=(float)$s->fetch()['movement'];
$s=$pdo->prepare('SELECT COALESCE(SUM(opening_balance),0) opening FROM sumber_dana WHERE user_id=?');$s->execute([$user['id']]);$opening=(float)$s->fetch()['opening'];
json_response(['ok'=>true,'month'=>$month,'income'=>(float)$summary['income'],'expense'=>(float)$summary['expense'],'balance'=>$opening+$movement,'transactions'=>(int)$summary['transactions']]);
