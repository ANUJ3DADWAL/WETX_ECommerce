<?php

class Order {
    private int $order_id;
    private int $user_id;
    private string $order_date;
    private float $total_amount;
    private string $status;
    private ?string $shipping_address;

    // Constructor
    public function __construct(int $user_id, float $total_amount, string $status = 'Pending', ?string $shipping_address = null) {
        $this->user_id = $user_id;
        $this->total_amount = $total_amount;
        $this->status = $status;
        $this->shipping_address = $shipping_address;
    }

    // Getters and Setters
    public function getOrderId(): int {
        return $this->order_id;
    }

    public function getUserId(): int {
        return $this->user_id;
    }

    public function setUserId(int $user_id): void {
        $this->user_id = $user_id;
    }

    public function getOrderDate(): string {
        return $this->order_date;
    }

    public function getTotalAmount(): float {
        return $this->total_amount;
    }

    public function setTotalAmount(float $total_amount): void {
        $this->total_amount = $total_amount;
    }

    public function getStatus(): string {
        return $this->status;
    }

    public function setStatus(string $status): void {
        $this->status = $status;
    }

    public function getShippingAddress(): ?string {
        return $this->shipping_address;
    }

    public function setShippingAddress(?string $shipping_address): void {
        $this->shipping_address = $shipping_address;
    }
}

?>