<?php
// require_once 'BaseController.php';
// require_once '../models/Order.php';

// class OrderController extends BaseController {
//     public function createOrder() {
//         $data = json_decode(file_get_contents("php://input"), true);
//         $order = new Order($data['user_id'], $data['total_amount'], $data['status'], $data['shipping_address']);
//         // Save order to database (implement this logic)
//         $this->sendResponse(['message' => 'Order created successfully']);
//     }

//     public function getOrder($id) {
//         // Fetch order from database by $id (implement this logic)
//         $order = new Order(1, 100.0); // Example order
//         $this->sendResponse($order);
//     }

//     public function updateOrder($id) {
//         $data = json_decode(file_get_contents("php://input"), true);
//         // Fetch order from database by $id and update (implement this logic)
//         $this->sendResponse(['message' => 'Order updated successfully']);
//     }

//     public function deleteOrder($id) {
//         // Delete order from database by $id (implement this logic)
//         $this->sendResponse(['message' => 'Order deleted successfully']);
//     }
// }
?>


<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Order.php';
require_once __DIR__ . '/../config/Database.php';

class OrderController extends BaseController {
    private PDO $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function createOrder(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO `Order` (user_id, total_amount, status, shipping_address) VALUES (:user_id, :total_amount, :status, :shipping_address)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':total_amount', $data['total_amount']);
        $stmt->bindParam(':status', $data['status']);
        $stmt->bindParam(':shipping_address', $data['shipping_address']);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Order created successfully']);
        } else {
            $this->sendError('Failed to create order');
        }
    }

    public function getOrder(int $id): void {
        $query = 'SELECT * FROM `Order` WHERE order_id = :order_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $id);
        $stmt->execute();
        $order = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->sendResponse($order);
    }

    public function updateOrder(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE `Order` SET user_id = :user_id, total_amount = :total_amount, status = :status, shipping_address = :shipping_address WHERE order_id = :order_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':total_amount', $data['total_amount']);
        $stmt->bindParam(':status', $data['status']);
        $stmt->bindParam(':shipping_address', $data['shipping_address']);
        $stmt->bindParam(':order_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Order updated successfully']);
        } else {
            $this->sendError('Failed to update order');
        }
    }

    public function deleteOrder(int $id): void {
        $query = 'DELETE FROM `Order` WHERE order_id = :order_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Order deleted successfully']);
        } else {
            $this->sendError('Failed to delete order');
        }
    }
}
?>