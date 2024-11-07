<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../config/Database.php';

class ProductController extends BaseController {
    private PDO $conn;
    private CategoryController $categoryController;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
        $this->categoryController = new CategoryController();
    }

    public function createProduct(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . Product::getTableName() . ' (category_id, product_name, price, stock_quantity, description, image_url) VALUES (:category_id, :product_name, :price, :stock_quantity, :description, :image_url)';

        $category_id = $this->categoryController->getCategoryByName($data['category_name']);

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $category_id);
        $stmt->bindParam(':product_name', $data['product_name']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':stock_quantity', $data['stock_quantity']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':image_url', $data['image_url']);
        
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Product created successfully']);
        } else {
            $this->sendError('Failed to create product');
        }
    }

    public function getProduct(int $id): void {
        $query = 'SELECT * FROM Product WHERE product_id = :product_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':product_id', $id);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->sendResponse($product);
    }

    public function updateProduct(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE Product SET category_id = :category_id, product_name = :product_name, price = :price, stock_quantity = :stock_quantity, description = :description, image_url = :image_url WHERE product_id = :product_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $data['category_id']);
        $stmt->bindParam(':product_name', $data['product_name']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':stock_quantity', $data['stock_quantity']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':image_url', $data['image_url']);
        $stmt->bindParam(':product_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Product updated successfully']);
        } else {
            $this->sendError('Failed to update product');
        }
    }

    public function deleteProduct(int $id): void {
        $query = 'DELETE FROM Product WHERE product_id = :product_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':product_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Product deleted successfully']);
        } else {
            $this->sendError('Failed to delete product');
        }
    }
}

?>