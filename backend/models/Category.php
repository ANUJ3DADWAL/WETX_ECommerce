<?php

class Category {

    private const TABLE = 'categories';

    private int $category_id;
    private string $category_name;
    private string $created_at;

    // Constructor
    public function __construct(array $data) {
        $this->category_id = $data['category_id'];
        $this->category_name = $data['category_name'];
        $this->created_at = $data['created_at'];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getCategoryDetails(): array {
        return [
            'category_id' => $this->getCategoryId(),
            'category_name' => $this->getCategoryName(),
            'created_at' => $this->getCreatedAt(),
        ];
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