<?php
require_once 'BaseController.php';
require_once '../models/Category.php';

class CategoryController extends BaseController {
    public function createCategory() {
        $data = json_decode(file_get_contents("php://input"), true);
        $category = new Category($data['category_name']);
        // Save category to database (implement this logic)
        $this->sendResponse(['message' => 'Category created successfully']);
    }

    public function getCategory($id) {
        // Fetch category from database by $id (implement this logic)
        $category = new Category('Example Category'); // Example category
        $this->sendResponse($category);
    }

    public function updateCategory($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        // Fetch category from database by $id and update (implement this logic)
        $this->sendResponse(['message' => 'Category updated successfully']);
    }

    public function deleteCategory($id) {
        // Delete category from database by $id (implement this logic)
        $this->sendResponse(['message' => 'Category deleted successfully']);
    }
}
?>