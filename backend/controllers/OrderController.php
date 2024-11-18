<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Order.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../controllers/CartController.php';
require_once __DIR__ . '/../controllers/OrderItemsController.php';

class OrderController extends BaseController {
    private PDO $conn;
    private CartController $cartController;
    private OrderItemsController $orderItemsController;
    private ProductController $productController;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
        $this->cartController = new CartController();
        $this->orderItemsController = new OrderItemsController();
        $this->productController = new ProductController();
    }

    public function insertOrder(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . Order::getTableName() . ' (order_id, user_id, order_date, total_amount, status, shipping_base_address, shipping_city, shipping_state) VALUES (:order_id, :user_id, NOW(), :total_amount, "confirmed", :shipping_base_address, :shipping_city, :shipping_state)';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $data['order_id']);
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':total_amount', $data['total_amount']);
//        $stmt->bindParam(':status', $data['status']);
        $stmt->bindParam(':shipping_base_address', $data['shipping_base_address']);
        $stmt->bindParam(':shipping_city', $data['shipping_city']);
        $stmt->bindParam(':shipping_state', $data['shipping_state']);

        if ($stmt->execute()) {
            $order_id = $data['order_id'];
//            $order = $this->getOrderById($order_id);

            $order_items = $this->cartController->getCart($data['user_id']);

            foreach ($order_items as $item) {
                $this->orderItemsController->addOrderItem([
                    'order_id' => $order_id,
                    'product_id' => $item->getProductId(),
                    'quantity' => $item->getQuantity(),
                    'price' => $item->getPrice(),
                ]);
            }

            $this->sendResponse([
                'message' => 'Order created successfully',
//                'order' => $order->getOrderDetails(),
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

//    public function getOrder(string $id, bool $send = false): ?Order {
//        $query = 'SELECT * FROM ' . Order::getTableName() . ' WHERE order_id = :order_id';
//        $stmt = $this->conn->prepare($query);
//        $stmt->bindParam(':order_id', $id);
//        $stmt->execute();
//        $order = $stmt->fetch(PDO::FETCH_ASSOC);
//
//        if ($send) {
//            if ($order) {
//                $this->sendResponse($order);
//            } else {
//                $this->sendError('Order not found', 404);
//            }
//        }
//
//        return new Order($order);
//    }

//    public function getOrdersByUserId(int $userId): void {
//        $query = 'SELECT * FROM ' . Order::getTableName() . ' WHERE user_id = :user_id';
//        $stmt = $this->conn->prepare($query);
//        $stmt->bindParam(':user_id', $userId);
//        $stmt->execute();
//        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
//
//        if ($orders) {
//            $this->sendResponse($orders);
//        } else {
//            $this->sendError('No orders found for this user', 404);
//        }
//    }

    public function getOrderById(string $orderId): void {
        $query = '
            SELECT
                o.*,
                oi.order_item_id,
                oi.product_id,
                oi.quantity,
                oi.price
            FROM ' . Order::getTableName() . ' o
            LEFT JOIN ' . OrderItem::getTableName() . ' oi ON o.order_id = oi.order_id
            WHERE o.order_id = :order_id
        ';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $orderId);
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result = [];
        foreach ($orders as $order) {
            if (!isset($result['order_id'])) {
                $result = [
                    'order_id' => $order['order_id'],
                    'user_id' => $order['user_id'],
                    'order_date' => $order['order_date'],
                    'total_amount' => $order['total_amount'],
                    'status' => $order['status'],
                    'shipping_base_address' => $order['shipping_base_address'],
                    'shipping_city' => $order['shipping_city'],
                    'shipping_state' => $order['shipping_state'],
                    'order_items' => []
                ];
            }
            if ($order['order_item_id']) {
                $product = $this->productController->getProduct($order['product_id']);
                $result['order_items'][] = [
                    'order_item_id' => $order['order_item_id'],
                    'product' => $product->getProductDetails(),
                    'quantity' => $order['quantity'],
                    'price' => $order['price']
                ];
            }
        }

        if ($result) {
            $this->sendResponse($result);
        } else {
            $this->sendError('Order not found', 404);
        }
    }

    public function getOrdersByUserId(int $userId): void {
        $query = '
            SELECT 
                o.*, 
                oi.order_item_id, 
                oi.product_id, 
                oi.quantity, 
                oi.price 
            FROM ' . Order::getTableName() . ' o
            LEFT JOIN ' . OrderItem::getTableName() . ' oi ON o.order_id = oi.order_id
            WHERE o.user_id = :user_id
            ORDER BY o.order_date DESC
        ';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result = [];
        foreach ($orders as $order) {
            $orderId = $order['order_id'];
            if (!isset($result[$orderId])) {
                $result[$orderId] = [
                    'order_id' => $order['order_id'],
                    'user_id' => $order['user_id'],
                    'order_date' => $order['order_date'],
                    'total_amount' => $order['total_amount'],
                    'status' => $order['status'],
                    'shipping_base_address' => $order['shipping_base_address'],
                    'shipping_city' => $order['shipping_city'],
                    'shipping_state' => $order['shipping_state'],
                    'order_items' => []
                ];
            }
            if ($order['order_item_id']) {
                $product = $this->productController->getProduct($order['product_id']);
                $result[$orderId]['order_items'][] = [
                    'order_item_id' => $order['order_item_id'],
                    'product' => $product->getProductDetails(),
                    'quantity' => $order['quantity'],
                    'price' => $order['price']
                ];
            }
        }

        if ($result) {
            $this->sendResponse(array_values($result));
        } else {
            $this->sendError('No orders found for this user', 404);
        }
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