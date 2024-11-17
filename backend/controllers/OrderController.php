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
        $query = 'INSERT INTO ' . Order::getTableName() . ' (order_id, user_id, order_date, total_amount, status, shipping_base_address, shipping_city, shipping_state) VALUES (:order_id, :user_id, :order_date, :total_amount, :status, :shipping_base_address, :shipping_city, :shipping_state)';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $data['order_id']);
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':order_date', $data['order_date']);
        $stmt->bindParam(':total_amount', $data['total_amount']);
        $stmt->bindParam(':status', $data['status']);
        $stmt->bindParam(':shipping_base_address', $data['shipping_base_address']);
        $stmt->bindParam(':shipping_city', $data['shipping_city']);
        $stmt->bindParam(':shipping_state', $data['shipping_state']);

        if ($stmt->execute()) {
            $orderId = $data['order_id'];
            $order = $this->getOrder($orderId);

            $this->sendResponse([
                'message' => 'Order created successfully',
                'order' => $order->getOrderDetails(),
            ], 201);
        } else {
            $this->sendError('Failed to create order');
        }
    }

    public function getAllOrders(): void {
        $query = 'SELECT * FROM ' . Order::getTableName();
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->sendResponse($orders);
    }

    public function getOrder(string $id, bool $send = false): ?Order {
        $query = 'SELECT * FROM ' . Order::getTableName() . ' WHERE order_id = :order_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $id);
        $stmt->execute();
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($send) {
            if ($order) {
                $this->sendResponse($order);
            } else {
                $this->sendError('Order not found', 404);
            }
        }

        return new Order($order);
    }

    public function updateOrder(string $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . Order::getTableName() . ' SET user_id = :user_id, order_date = :order_date, total_amount = :total_amount, status = :status, shipping_base_address = :shipping_base_address, shipping_city = :shipping_city, shipping_state = :shipping_state WHERE order_id = :order_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':order_date', $data['order_date']);
        $stmt->bindParam(':total_amount', $data['total_amount']);
        $stmt->bindParam(':status', $data['status']);
        $stmt->bindParam(':shipping_base_address', $data['shipping_base_address']);
        $stmt->bindParam(':shipping_city', $data['shipping_city']);
        $stmt->bindParam(':shipping_state', $data['shipping_state']);
        $stmt->bindParam(':order_id', $id);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Order updated successfully']);
        } else {
            $this->sendError('Failed to update order');
        }
    }

    public function deleteOrder(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['order_id'];

        if (empty($id)) {
            $this->sendError('Order id is required');
        }

        $order = $this->getOrder($id);
        if (empty($order)) {
            $this->sendError('Order not found', 404);
        }

        $query = 'DELETE FROM ' . Order::getTableName() . ' WHERE order_id = :order_id';
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