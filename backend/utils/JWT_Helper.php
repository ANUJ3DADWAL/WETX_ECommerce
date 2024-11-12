<?php

use \Firebase\JWT\JWT;

class JWT_Helper {
    private string $user_secret_key;
    private string $admin_secret_key;

    public function __construct() {
        $this->user_secret_key = $_ENV['USER_JWT_SECRET'];
        $this->admin_secret_key = $_ENV['ADMIN_JWT_SECRET'];
    }

    public function generateJWT(array $payload, bool $admin = false): string {
        $key = $admin ? $this->admin_secret_key : $this->user_secret_key;

        return JWT::encode($payload, $key, 'HS256');
    }

    function decodeJWT(string $jwt, bool $admin = false): string|array {
        $key = $admin ? $this->admin_secret_key : $this->user_secret_key;

        try {
            $decoded = JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
            return (array)$decoded;
        } catch (Exception $e) {
            return 'Caught exception: ' . $e->getMessage() . "\n";
        }
    }

    function verifyJWT(string $jwt, bool $admin = false): array {
        $key = $admin ? $this->admin_secret_key : $this->user_secret_key;

        try {
            $decoded = JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
            // Token is valid
//        return "Token is valid.";
            return array(
                "valid" => true,
                "data" => (array)$decoded
            );
        } catch (Exception $e) {
            // Token is invalid
//        return 'Token is invalid: ' . $e->getMessage() . "\n";
            return array(
                "valid" => false
            );
        }
    }
}