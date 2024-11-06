<?php
require_once 'BaseController.php';
require_once '../models/Order.php';

class OrderController extends BaseController {
    public function createOrder() {
        $data = json_decode(file_get_contents("php://input"), true);
        $order = new Order($data['user_id'], $data['total_amount'], $data['status'], $data['shipping_address']);
        // Save order to database (implement this logic)
        $this->sendResponse(['message' => 'Order created successfully']);
    }

    public function getOrder($id) {
        // Fetch order from database by $id (implement this logic)
        $order = new Order(1, 100.0); // Example order
        $this->sendResponse($order);
    }

    public function updateOrder($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        // Fetch order from database by $id and update (implement this logic)
        $this->sendResponse(['message' => 'Order updated successfully']);
    }

    public function deleteOrder($id) {
        // Delete order from database by $id (implement this logic)
        $this->sendResponse(['message' => 'Order deleted successfully']);
    }
}
?>