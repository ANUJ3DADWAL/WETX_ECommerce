<?php

class User {
    private const TABLE = 'users';

    private int $user_id;
    private string $password;
    private string $email;
    private ?string $first_name;
    private ?string $last_name;
    private ?string $phone_number;
    private ?string $base_address;
    private ?string $city;
    private ?string $state;
    private string $created_at;

    // Constructor
//    public function __construct(string $password, string $email, ?string $first_name = null, ?string $last_name = null, ?string $phone_number = null, ?string $base_address = null, ?string $city = null, ?string $state = null) {
//        $this->password = $password;
//        $this->email = $email;
//        $this->first_name = $first_name;
//        $this->last_name = $last_name;
//        $this->phone_number = $phone_number;
//        $this->base_address = $base_address;
//        $this->city = $city;
//        $this->state = $state;
//    }
    public function __construct(array $data) {
        $this->user_id = $data['user_id'];
        $this->password = $data['password'];
        $this->email = $data['email'];
        $this->first_name = $data['first_name'] ?? null;
        $this->last_name = $data['last_name'] ?? null;
        $this->phone_number = $data['phone_number'] ?? null;
        $this->base_address = $data['base_address'] ?? null;
        $this->city = $data['city'] ?? null;
        $this->state = $data['state'] ?? null;
        $this->created_at = $data['created_at'];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getUserDetails(): array {
        return [
            'user_id' => $this->getUserId(),
            'email' => $this->getEmail(),
            'first_name' => $this->getFirstName(),
            'last_name' => $this->getLastName(),
            'phone_number' => $this->getPhoneNumber(),
            'base_address' => $this->getBaseAddress(),
            'city' => $this->getCity(),
            'state' => $this->getState(),
            'created_at' => $this->getCreatedAt(),
        ];
    }

    // Getters and Setters
    public function getUserId(): int {
        return $this->user_id;
    }

    public function setUserId(int $user_id): void {
        $this->user_id = $user_id;
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

    public function getFirstName(): ?string {
        return $this->first_name;
    }

    public function setFirstName(?string $first_name): void {
        $this->first_name = $first_name;
    }

    public function getLastName(): ?string {
        return $this->last_name;
    }

    public function setLastName(?string $last_name): void {
        $this->last_name = $last_name;
    }

    public function getPhoneNumber(): ?string {
        return $this->phone_number;
    }

    public function setPhoneNumber(?string $phone_number): void {
        $this->phone_number = $phone_number;
    }

    public function getBaseAddress(): ?string {
        return $this->base_address;
    }

    public function setBaseAddress(?string $base_address): void {
        $this->base_address = $base_address;
    }

    public function getCity(): ?string {
        return $this->city;
    }

    public function setCity(?string $city): void {
        $this->city = $city;
    }

    public function getState(): ?string {
        return $this->state;
    }

    public function setState(?string $state): void {
        $this->state = $state;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }

    public function setCreatedAt(string $created_at): void {
        $this->created_at = $created_at;
    }
}
?>