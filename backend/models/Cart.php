<?php
class Cart {
    private int $cart_id;
    private int $user_id;
    private int $product_id;
    private int $quantity;
    private string $created_at;

    // Constructor
    public function __construct(int $user_id, int $product_id, int $quantity) {
        $this->user_id = $user_id;
        $this->product_id = $product_id;
        $this->quantity = $quantity;
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

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}
?>