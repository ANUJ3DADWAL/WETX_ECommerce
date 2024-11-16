<?php

class Cart {
    private const TABLE = 'carts';

    private int $cart_id;
    private int $user_id;
    private int $product_id;
    private int $quantity;
    private int $price;
    private string $created_at;

    // Constructor
//    public function __construct(int $user_id, int $product_id, int $quantity) {
//        $this->user_id = $user_id;
//        $this->product_id = $product_id;
//        $this->quantity = $quantity;
//    }
    public function __construct(array $data) {
        $this->cart_id = $data['cart_id'];
        $this->user_id = $data['user_id'];
        $this->product_id = $data['product_id'];
        $this->quantity = $data['quantity'];
        $this->price = $data['price'];
        $this->created_at = $data['created_at'];
    }

    public function getCartDetails(): array {
        return [
            'cart_id' => $this->getCartId(),
            'user_id' => $this->getUserId(),
            'product_id' => $this->getProductId(),
            'quantity' => $this->getQuantity(),
            'price' => $this->getQuantity(),
            'created_at' => $this->getCreatedAt(),
        ];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    // Getters and Setters
    public function getCartId(): int {
        return $this->cart_id;
    }

    public function getUserId(): int {
        return $this->user_id;
    }

    public function setUserId(int $user_id): void {
        $this->user_id = $user_id;
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

    public function getPrice(): int {
        return $this->price;
    }

    public function setPrice(int $price): void {
        $this->price = $price;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}

?>