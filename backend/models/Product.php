<?php

class Product {
    private int $product_id;
    private int $category_id;
    private string $product_name;
    private ?string $description;
    private float $price;
    private int $stock_quantity;
    private ?string $image_url;
    private string $created_at;

    // Constructor
    public function __construct(int $category_id, string $product_name, float $price, int $stock_quantity, ?string $description = null, ?string $image_url = null) {
        $this->category_id = $category_id;
        $this->product_name = $product_name;
        $this->price = $price;
        $this->stock_quantity = $stock_quantity;
        $this->description = $description;
        $this->image_url = $image_url;
    }

    // Getters and Setters
    public function getProductId(): int {
        return $this->product_id;
    }

    public function getCategoryId(): int {
        return $this->category_id;
    }

    public function setCategoryId(int $category_id): void {
        $this->category_id = $category_id;
    }

    public function getProductName(): string {
        return $this->product_name;
    }

    public function setProductName(string $product_name): void {
        $this->product_name = $product_name;
    }

    public function getDescription(): ?string {
        return $this->description;
    }

    public function setDescription(?string $description): void {
        $this->description = $description;
    }

    public function getPrice(): float {
        return $this->price;
    }

    public function setPrice(float $price): void {
        $this->price = $price;
    }

    public function getStockQuantity(): int {
        return $this->stock_quantity;
    }

    public function setStockQuantity(int $stock_quantity): void {
        $this->stock_quantity = $stock_quantity;
    }

    public function getImageUrl(): ?string {
        return $this->image_url;
    }

    public function setImageUrl(?string $image_url): void {
        $this->image_url = $image_url;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}

?>