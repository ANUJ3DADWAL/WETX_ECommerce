<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Admin.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../utils/JWT_Helper.php';

class AdminController extends BaseController {
    private PDO $conn;
    private JWT_Helper $jwt;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
        $this->jwt = new JWT_Helper();
    }

    public function createAdmin(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . Admin::getTableName() . ' (username, password, email) VALUES (:username, :password, :email)';

        $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $data['username']);
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':email', $data['email']);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Admin created successfully'], 201);
        } else {
            $this->sendError('Failed to create admin');
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

        /** @var ?Admin $admin */
        $admin = $this->getAdminByEmail($data['email']);
        if (empty($admin)) {
            $this->sendError('Admin not found', 404);
        }

        if (password_verify($data['password'], $admin->getPassword())) {
            $this->sendResponse([
                'message' => 'Admin login successful',
                'admin' => $admin->getAdminDetails(),
                'token' => $this->jwt->generateJWT(array('userId' => $admin->getAdminId()))
            ], 201);
        } else {
            $this->sendError('Invalid credentials', 401);
        }
    }

    public function getAdminByEmail(string $email): ?Admin {
        $query = 'SELECT * FROM ' . Admin::getTableName() . ' WHERE email = :email';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($userData) {
            return new Admin($userData);
        }

        return null;
    }

    public function getAdminById(int $adminId): void {
        $query = 'SELECT * FROM ' . Admin::getTableName() . ' WHERE admin_id = :admin_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':admin_id', $adminId);
        $stmt->execute();
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin) {
            $this->sendResponse($admin);
        } else {
            $this->sendError('Admin not found', 404);
        }
    }

    public function updateAdmin(int $adminId): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . Admin::getTableName() . ' SET username = :username, password = :password, email = :email WHERE admin_id = :admin_id';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $data['username']);
        $stmt->bindParam(':password', password_hash($data['password'], PASSWORD_BCRYPT));
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':admin_id', $adminId);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Admin updated successfully']);
        } else {
            $this->sendError('Failed to update admin');
        }
    }

    public function deleteAdmin(int $adminId): void {
        $query = 'DELETE FROM ' . Admin::getTableName() . ' WHERE admin_id = :admin_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':admin_id', $adminId);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Admin deleted successfully']);
        } else {
            $this->sendError('Failed to delete admin');
        }
    }
}

?>