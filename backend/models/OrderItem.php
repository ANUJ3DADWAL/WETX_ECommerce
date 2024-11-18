<?php

class OrderItem {
    private const TABLE = 'order_items';

    private int $order_item_id;
    private string $order_id;
    private int $product_id;
    private int $quantity;
    private float $price;

    // Constructor
    public function __construct(array $data) {
        $this->order_item_id = $data['order_item_id'];
        $this->order_id = $data['order_id'];
        $this->product_id = $data['product_id'];
        $this->quantity = $data['quantity'];
        $this->price = $data['price'];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getOrderItemDetails(): array {
        return [
            'order_item_id' => $this->getOrderItemId(),
            'order_id' => $this->getOrderId(),
            'product_id' => $this->getProductId(),
            'quantity' => $this->getQuantity(),
            'price' => $this->getPrice(),
        ];
    }

    // Getters and Setters
    public function getOrderItemId(): int {
        return $this->order_item_id;
    }

    public function getOrderId(): string {
        return $this->order_id;
    }

    public function setOrderId(string $order_id): void {
        $this->order_id = $order_id;
    }

    public function getProductId(): int {
        return $this->product_id;
    }

    public function setProductId(int $product_id): void {
        $this->product_id = $product_id;
    }

    public function getQuantity(): int {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): void {
        $this->quantity = $quantity;
    }

    public function getPrice(): float {
        return $this->price;
    }

    public function setPrice(float $price): void {
        $this->price = $price;
    }
}

?>