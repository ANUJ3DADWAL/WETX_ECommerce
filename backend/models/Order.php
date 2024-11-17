<?php

class Order {
    private const TABLE = 'orders';

    private string $order_id;
    private int $user_id;
    private string $order_date;
    private float $total_amount;
    private string $status;
    private ?string $shipping_base_address;
    private ?string $shipping_city;
    private ?string $shipping_state;

    // Constructor
    public function __construct(array $data) {
        $this->order_id = $data['order_id'];
        $this->user_id = $data['user_id'];
        $this->order_date = $data['order_date'];
        $this->total_amount = $data['total_amount'];
        $this->status = $data['status'] ?? 'Pending';
        $this->shipping_base_address = $data['shipping_base_address'] ?? null;
        $this->shipping_city = $data['shipping_city'] ?? null;
        $this->shipping_state = $data['shipping_state'] ?? null;
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getOrderDetails(): array {
        return [
            'order_id' => $this->getOrderId(),
            'user_id' => $this->getUserId(),
            'order_date' => $this->getOrderDate(),
            'total_amount' => $this->getTotalAmount(),
            'status' => $this->getStatus(),
            'shipping_base_address' => $this->getShippingBaseAddress(),
            'shipping_city' => $this->getShippingCity(),
            'shipping_state' => $this->getShippingState(),
        ];
    }

    // Getters and Setters
    public function getOrderId(): string {
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

    public function setOrderDate(string $order_date): void {
        $this->order_date = $order_date;
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

    public function getShippingBaseAddress(): ?string {
        return $this->shipping_base_address;
    }

    public function setShippingBaseAddress(?string $shipping_base_address): void {
        $this->shipping_base_address = $shipping_base_address;
    }

    public function getShippingCity(): ?string {
        return $this->shipping_city;
    }

    public function setShippingCity(?string $shipping_city): void {
        $this->shipping_city = $shipping_city;
    }

    public function getShippingState(): ?string {
        return $this->shipping_state;
    }

    public function setShippingState(?string $shipping_state): void {
        $this->shipping_state = $shipping_state;
    }
}

?>