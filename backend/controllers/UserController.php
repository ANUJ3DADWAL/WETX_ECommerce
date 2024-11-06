<?php
// require_once 'BaseController.php';
// require_once '../models/User.php';

// class UserController extends BaseController {
//     public function createUser() {
//         $data = json_decode(file_get_contents("php://input"), true);
//         $user = new User($data['password'], $data['email'], $data['first_name'], $data['last_name'], $data['phone_number'], $data['address']);
//         // Save user to database (implement this logic)
//         $this->sendResponse(['message' => 'User created successfully']);
//     }

//     public function getUser($id) {
//         // Fetch user from database by $id (implement this logic)
//         $user = new User('password', 'email@example.com'); // Example user
//         $this->sendResponse($user);
//     }

//     public function updateUser($id) {
//         $data = json_decode(file_get_contents("php://input"), true);
//         // Fetch user from database by $id and update (implement this logic)
//         $this->sendResponse(['message' => 'User updated successfully']);
//     }

//     public function deleteUser($id) {
//         // Delete user from database by $id (implement this logic)
//         $this->sendResponse(['message' => 'User deleted successfully']);
//     }
// }
?>


<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../config/Database.php';

class UserController extends BaseController {
    private PDO $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function createUser(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO '.User::TABLE.' (password, email, first_name, last_name, phone_number, base_address, city, state) VALUES (:password, :email, :first_name, :last_name, :phone_number, :base_address, :city, :state)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':password', $data['password']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':first_name', $data['first_name']);
        $stmt->bindParam(':last_name', $data['last_name']);
        $stmt->bindParam(':phone_number', $data['phone_number']);
        $stmt->bindParam(':base_address', $data['base_address']);
        $stmt->bindParam(':city', $data['city']);
        $stmt->bindParam(':state', $data['state']);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'User created successfully']);
        } else {
            $this->sendError('Failed to create user');
        }
    }

    public function getUser(int $id): void {
        $query = 'SELECT * FROM '.User::TABLE.' WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $id);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->sendResponse($user);
    }

    public function updateUser(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE '.User::TABLE.' SET password = :password, email = :email, first_name = :first_name, last_name = :last_name, phone_number = :phone_number, base_address = :base_address, city = :city, state = :state WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':password', $data['password']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':first_name', $data['first_name']);
        $stmt->bindParam(':last_name', $data['last_name']);
        $stmt->bindParam(':phone_number', $data['phone_number']);
        $stmt->bindParam(':base_address', $data['base_address']);
        $stmt->bindParam(':city', $data['city']);
        $stmt->bindParam(':state', $data['state']);
        $stmt->bindParam(':user_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'User updated successfully']);
        } else {
            $this->sendError('Failed to update user');
        }
    }

    public function deleteUser(int $id): void {
        $query = 'DELETE FROM '.User::TABLE.' WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'User deleted successfully']);
        } else {
            $this->sendError('Failed to delete user');
        }
    }
}
?>