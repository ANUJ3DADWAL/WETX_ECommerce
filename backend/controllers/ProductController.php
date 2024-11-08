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

        $category = $this->categoryController->getCategoryByName($data['category_name']);
        $category_id = $category->getCategoryId();

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $category_id);
        $stmt->bindParam(':product_name', $data['product_name']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':stock_quantity', $data['stock_quantity']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':image_url', $data['image_url']);

        if ($stmt->execute()) {
            $productId = $this->conn->lastInsertId();
            $product = $this->getProduct($productId);

            $this->sendResponse([
                'message' => 'Product created successfully',
                'product' => $product->getProductDetails(),

            ], 201);

        } else {
            $this->sendError('Failed to create product');
        }
    }

    public function getAllProducts(): void {
        $query = 'SELECT p.*, c.category_name 
              FROM ' . Product::getTableName() . ' p 
              JOIN ' . Category::getTableName() . ' c 
              ON p.category_id = c.category_id';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->sendResponse($products);
    }

    public function getProduct(int $id, bool $send = false): ?Product {
//        $query = 'SELECT * FROM ' . Product::getTableName() . ' WHERE product_id = :product_id';

        $query = 'SELECT p.*, c.category_name 
              FROM ' . Product::getTableName() . ' p 
              JOIN ' . Category::getTableName() . ' c 
              ON p.category_id = c.category_id 
              WHERE p.product_id = :product_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':product_id', $id);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($send) {
            if ($product) {
                $this->sendResponse($product);
            } else {
                $this->sendError('Product not found', 404);
            }
        }

        return new Product($product);
    }

    public function updateProduct(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . Product::getTableName() . ' SET category_id = :category_id, product_name = :product_name, price = :price, stock_quantity = :stock_quantity, description = :description, image_url = :image_url WHERE product_id = :product_id';
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

    public function deleteProduct(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['productId'];

        if (empty($id)) {
            $this->sendError('Product id is required');
        }

        $product = $this->getProduct($id);
        if (empty($product)) {
            $this->sendError('Product not found', 404);
        }

        $query = 'DELETE FROM ' . Product::getTableName() . ' WHERE product_id = :product_id';
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