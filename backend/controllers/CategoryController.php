<?php
// require_once 'BaseController.php';
// require_once '../models/Category.php';

// class CategoryController extends BaseController {
//     public function createCategory() {
//         $data = json_decode(file_get_contents("php://input"), true);
//         $category = new Category($data['category_name']);
//         // Save category to database (implement this logic)
//         $this->sendResponse(['message' => 'Category created successfully']);
//     }

//     public function getCategory($id) {
//         // Fetch category from database by $id (implement this logic)
//         $category = new Category('Example Category'); // Example category
//         $this->sendResponse($category);
//     }

//     public function updateCategory($id) {
//         $data = json_decode(file_get_contents("php://input"), true);
//         // Fetch category from database by $id and update (implement this logic)
//         $this->sendResponse(['message' => 'Category updated successfully']);
//     }

//     public function deleteCategory($id) {
//         // Delete category from database by $id (implement this logic)
//         $this->sendResponse(['message' => 'Category deleted successfully']);
//     }
// }
?>

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
        $query = 'INSERT INTO Category (category_name) VALUES (:category_name)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_name', $data['category_name']);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Category created successfully']);
        } else {
            $this->sendError('Failed to create category');
        }
    }

    public function getCategory(int $id): void {
        $query = 'SELECT * FROM Category WHERE category_id = :category_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $id);
        $stmt->execute();
        $category = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->sendResponse($category);
    }

    public function updateCategory(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE Category SET category_name = :category_name WHERE category_id = :category_id';
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
        $query = 'DELETE FROM Category WHERE category_id = :category_id';
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