<?php

class Admin {
    private const TABLE = 'admin';

    private int $admin_id;
    private string $username;
    private string $password;
    private string $email;
    private string $created_at;

    public function __construct(array $data) {
        $this->admin_id = $data['admin_id'];
        $this->username = $data['username'];
        $this->password = $data['password'];
        $this->email = $data['email'];
        $this->created_at = $data['created_at'];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getAdminDetails(): array {
        return [
            'admin_id' => $this->admin_id,
            'username' => $this->username,
            'email' => $this->email,
            'created_at' => $this->created_at,
        ];
    }

    // Getters and Setters
    public function getAdminId(): int {
        return $this->admin_id;
    }

    public function getUsername(): string {
        return $this->username;
    }

    public function setUsername(string $username): void {
        $this->username = $username;
    }

    public function getPassword(): string {
        return $this->password;
    }

    public function setPassword(string $password): void {
        $this->password = $password;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function setEmail(string $email): void {
        $this->email = $email;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}

?>