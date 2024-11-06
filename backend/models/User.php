<?php

class User {
    private int $user_id;
    private string $password;
    private string $email;
    private ?string $first_name;
    private ?string $last_name;
    private ?string $phone_number;
    private ?string $address;
    private string $created_at;

    // Constructor
    public function __construct(string $password, string $email, ?string $first_name = null, ?string $last_name = null, ?string $phone_number = null, ?string $address = null) {
        $this->password = $password;
        $this->email = $email;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->phone_number = $phone_number;
        $this->address = $address;
    }

    // Getters and Setters
    public function getUserId(): int {
        return $this->user_id;
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

    public function getAddress(): ?string {
        return $this->address;
    }

    public function setAddress(?string $address): void {
        $this->address = $address;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}

?>