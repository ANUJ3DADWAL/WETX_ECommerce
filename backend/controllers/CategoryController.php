<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . '/../config/Database.php';

class CategoryController extends BaseController {
    private PDO $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function createCategory(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . Category::getTableName() . ' (category_name) VALUES (:category_name)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_name', $data['category_name']);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Category created successfully']);
        } else {
            $this->sendError('Failed to create category');
        }
    }

    public function getCategory(int $id, bool $send = false): ?Category {
        $query = 'SELECT * FROM ' . Category::getTableName() . ' WHERE category_id = :category_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $id);
        $stmt->execute();
        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($send) {
            $this->sendResponse($category);
        }

        return new Category($category);
    }

    public function getCategoryByName(string $name): ?Category {
        $query = 'SELECT * FROM ' . Category::getTableName() . ' WHERE category_name = :category_name';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_name', $name);
        $stmt->execute();
        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($category) {
            return new Category($category);
        }

        return null;
    }

    public function updateCategory(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . Category::getTableName() . ' SET category_name = :category_name WHERE category_id = :category_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_name', $data['category_name']);
        $stmt->bindParam(':category_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Category updated successfully']);
        } else {
            $this->sendError('Failed to update category');
        }
    }

    public function deleteCategory(int $id): void {
        $query = 'DELETE FROM ' . Category::getTableName() . ' WHERE category_id = :category_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Category deleted successfully']);
        } else {
            $this->sendError('Failed to delete category');
        }
    }
}

?>