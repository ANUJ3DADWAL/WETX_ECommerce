<?php
require_once 'BaseController.php';
require_once '../models/User.php';

class UserController extends BaseController {
    public function createUser() {
        $data = json_decode(file_get_contents("php://input"), true);
        $user = new User($data['password'], $data['email'], $data['first_name'], $data['last_name'], $data['phone_number'], $data['address']);
        // Save user to database (implement this logic)
        $this->sendResponse(['message' => 'User created successfully']);
    }

    public function getUser($id) {
        // Fetch user from database by $id (implement this logic)
        $user = new User('password', 'email@example.com'); // Example user
        $this->sendResponse($user);
    }

    public function updateUser($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        // Fetch user from database by $id and update (implement this logic)
        $this->sendResponse(['message' => 'User updated successfully']);
    }

    public function deleteUser($id) {
        // Delete user from database by $id (implement this logic)
        $this->sendResponse(['message' => 'User deleted successfully']);
    }
}
?>