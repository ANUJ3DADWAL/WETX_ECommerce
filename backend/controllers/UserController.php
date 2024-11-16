<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../utils/JWT_Helper.php';

class UserController extends BaseController {
    private PDO $conn;
    private JWT_Helper $jwt;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
        $this->jwt = new JWT_Helper();
    }

    public function signup(): void {
        $data = json_decode(file_get_contents("php://input"), true);

        $query = 'INSERT INTO ' . User::getTableName() . ' (email, password, first_name, last_name) VALUES (:email, :password, :first_name, :last_name)';

        foreach ($data as &$element) {
            $element = htmlspecialchars($element);
        }

        /** @var ?User $existingUser */
        $existingUser = $this->getUserByEmail($data['email']);
        if (!empty($existingUser)) {
            $this->sendError('User already exists');
        }

        $hashed_password = password_hash($data["password"], PASSWORD_BCRYPT);

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':first_name', $data['first_name']);
        $stmt->bindParam(':last_name', $data['last_name']);

        if ($stmt->execute()) {
            $userId = $this->conn->lastInsertId();
            $user = $this->getUser($userId);

            $this->sendResponse([
                'message' => 'User signup successfully',
                'user' => $user->getUserDetails(),
                'token' => $this->jwt->generateJWT(array('userId' => $user->getUserId()))
            ], 201);
        } else {
            $this->sendError('Failed to create user', 500);
        }
    }

    public function login(): void {
        $data = json_decode(file_get_contents("php://input"), true);

        foreach ($data as &$element) {
            $element = htmlspecialchars($element);
        }

        if (empty($data['email']) || empty($data['password'])) {
            $this->sendError('Invalid request. Enter required parameters.');
        }

        /** @var ?User $user */
        $user = $this->getUserByEmail($data['email']);
        if (empty($user)) {
            $this->sendError('User not found', 404);
        }

        if (password_verify($data['password'], $user->getPassword())) {
            $this->sendResponse([
                'message' => 'User login successful',
                'user' => $user->getUserDetails(),
                'token' => $this->jwt->generateJWT(array('userId' => $user->getUserId()))
            ], 201);
        } else {
            $this->sendError('Invalid credentials', 401);
        }
    }

    public function verifyToken(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $token = $data['token'];

        if (empty($token)) {
            $this->sendError("Token not found");
        }

        $verified = $this->jwt->verifyJWT($token);
        if ($verified['valid']) {
            $user = $this->getUser($verified['data']['userId']);

            $this->sendResponse(array(
                "valid" => true,
                "user" => $user->getUserDetails()
            ), 200);
        } else {
//            $this->sendResponse("Invalid token", 401);
            $this->sendResponse(array(
                "valid" => false,
            ), 401);
        }
    }

//    public function createUser(): void {
//        $data = json_decode(file_get_contents("php://input"), true);
//        $query = 'INSERT INTO ' . User::getTableName() . ' (password, email, first_name, last_name, phone_number, base_address, city, state) VALUES (:password, :email, :first_name, :last_name, :phone_number, :base_address, :city, :state)';
//
//        $stmt = $this->conn->prepare($query);
//        $stmt->bindParam(':password', $data['password']);
//        $stmt->bindParam(':email', $data['email']);
//        $stmt->bindParam(':first_name', $data['first_name']);
//        $stmt->bindParam(':last_name', $data['last_name']);
//        $stmt->bindParam(':phone_number', $data['phone_number']);
//        $stmt->bindParam(':base_address', $data['base_address']);
//        $stmt->bindParam(':city', $data['city']);
//        $stmt->bindParam(':state', $data['state']);
//
//        if ($stmt->execute()) {
//            $this->sendResponse(['message' => 'User created successfully']);
//        } else {
//            $this->sendError('Failed to create user');
//        }
//    }

    public function getUser(int $id, bool $send = false): ?User {
        $query = 'SELECT * FROM ' . User::getTableName() . ' WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $id);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($send) {
            $this->sendResponse($user);
        }

        return new User($user);
    }

    public function getUserByEmail(string $email): ?User {
        $query = 'SELECT * FROM ' . User::getTableName() . ' WHERE email = :email';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($userData) {
            return new User($userData);
        }

        return null;
    }

    public function updateUser(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . User::getTableName() . ' SET password = :password, email = :email, first_name = :first_name, last_name = :last_name, phone_number = :phone_number, base_address = :base_address, city = :city, state = :state WHERE user_id = :user_id';
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

    public function deleteUser(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['userId'];

        if (empty($id)) {
            $this->sendError('User id is required');
        }

        $user = $this->getUser($id);
        if (empty($user)) {
            $this->sendError('User not found', 404);
        }

        $query = 'DELETE FROM ' . User::getTableName() . ' WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $id);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'User deleted successfully']);
        } else {
            $this->sendError('Failed to delete user');
        }
    }

    public function addDeliveryDetails(int $userId): void {
        $data = json_decode(file_get_contents("php://input"), true);

        foreach ($data as &$element) {
            $element = htmlspecialchars($element);
        }

        if (empty($data['phone']) || empty($data['base_address']) || empty($data['city']) || empty($data['state'])) {
            $this->sendError('Invalid request. Enter required parameters.');
        }

        $query = 'UPDATE ' . User::getTableName() . ' SET phone_number = :phone, base_address = :base_address, city = :city, state = :state WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':phone', $data['phone']);
        $stmt->bindParam(':base_address', $data['base_address']);
        $stmt->bindParam(':city', $data['city']);
        $stmt->bindParam(':state', $data['state']);
        $stmt->bindParam(':user_id', $userId);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Delivery details added successfully']);
        } else {
            $this->sendError('Failed to add delivery details');
        }
    }
}

?>