<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/OrderItem.php';
require_once __DIR__ . '/../config/Database.php';

class OrderItemsController extends BaseController {
    private PDO $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function addOrderItem(array $data): void {
//        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . OrderItem::getTableName() . ' (order_id, product_id, quantity, price) VALUES (:order_id, :product_id, :quantity, :price)';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $data['order_id']);
        $stmt->bindParam(':product_id', $data['product_id']);
        $stmt->bindParam(':quantity', $data['quantity']);
        $stmt->bindParam(':price', $data['price']);

        if ($stmt->execute()) {
            $orderItemId = $this->conn->lastInsertId();
            $orderItem = $this->getOrderItem($orderItemId);

//            $this->sendResponse([
//                'message' => 'Order item created successfully',
//                'order_item' => $orderItem->getOrderItemDetails(),
//            ], 201);
        } else {
            $this->sendError('Failed to create order item');
        }
    }

    public function getOrderItem(int $id, bool $send = false): ?OrderItem {
        $query = 'SELECT * FROM ' . OrderItem::getTableName() . ' WHERE order_item_id = :order_item_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_item_id', $id);
        $stmt->execute();
        $orderItem = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($send) {
            if ($orderItem) {
                $this->sendResponse($orderItem);
            } else {
                $this->sendError('Order item not found', 404);
            }
        }

        return new OrderItem($orderItem);
    }

    public function updateOrderItem(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE ' . OrderItem::getTableName() . ' SET order_id = :order_id, product_id = :product_id, quantity = :quantity, price = :price WHERE order_item_id = :order_item_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $data['order_id']);
        $stmt->bindParam(':product_id', $data['product_id']);
        $stmt->bindParam(':quantity', $data['quantity']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':order_item_id', $id);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Order item updated successfully']);
        } else {
            $this->sendError('Failed to update order item');
        }
    }

    public function deleteOrderItem(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['order_item_id'];

        if (empty($id)) {
            $this->sendError('Order item id is required');
        }

        $orderItem = $this->getOrderItem($id);
        if (empty($orderItem)) {
            $this->sendError('Order item not found', 404);
        }

        $query = 'DELETE FROM ' . OrderItem::getTableName() . ' WHERE order_item_id = :order_item_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_item_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Order item deleted successfully']);
        } else {
            $this->sendError('Failed to delete order item');
        }
    }
}

?>