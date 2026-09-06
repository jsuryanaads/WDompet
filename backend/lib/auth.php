<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/response.php';

function bearer_token(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(.+)/i', $header, $m)) return trim($m[1]);
    return null;
}

function require_auth(): array
{
    $token = bearer_token();
    if (!$token) json_response(['ok' => false, 'message' => 'Token diperlukan.'], 401);

    $sql = 'SELECT u.id, u.name, u.email, u.role, s.token_hash, s.expires_at
            FROM api_sessions s JOIN users u ON u.id=s.user_id
            WHERE s.token_hash=? AND s.expires_at > NOW() AND u.active=1 LIMIT 1';
    $stmt = db()->prepare($sql);
    $stmt->execute([hash('sha256', $token)]);
    $user = $stmt->fetch();
    if (!$user) json_response(['ok' => false, 'message' => 'Token tidak valid atau sudah kedaluwarsa.'], 401);
    return $user;
}
