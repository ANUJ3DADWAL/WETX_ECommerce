<?php

class Category {
    private int $category_id;
    private string $category_name;
    private string $created_at;

    // Constructor
    public function __construct(string $category_name) {
        $this->category_name = $category_name;
    }

    // Getters and Setters
    public function getCategoryId(): int {
        return $this->category_id;
    }

    public function getCategoryName(): string {
        return $this->category_name;
    }

    public function setCategoryName(string $category_name): void {
        $this->category_name = $category_name;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}

?>