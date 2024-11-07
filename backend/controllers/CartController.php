<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Cart.php';
require_once __DIR__ . '/../config/Database.php';

class CartController extends BaseController {
    private PDO $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function addItem(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO Cart (user_id, product_id, quantity) VALUES (:user_id, :product_id, :quantity)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':product_id', $data['product_id']);
        $stmt->bindParam(':quantity', $data['quantity']);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Item added to cart successfully']);
        } else {
            $this->sendError('Failed to add item to cart');
        }
    }

    public function updateQuantity(int $id): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'UPDATE Cart SET quantity = :quantity WHERE cart_id = :cart_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':quantity', $data['quantity']);
        $stmt->bindParam(':cart_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Cart quantity updated successfully']);
        } else {
            $this->sendError('Failed to update cart quantity');
        }
    }

    public function removeItem(int $id): void {
        $query = 'DELETE FROM Cart WHERE cart_id = :cart_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':cart_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Item removed from cart successfully']);
        } else {
            $this->sendError('Failed to remove item from cart');
        }
    }

    public function checkout(int $user_id): void {
        // Fetch all cart items for the user and mark them as paid (implement this logic)
        $query = 'SELECT * FROM Cart WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Assume payment is successful and clear the cart
        $query = 'DELETE FROM Cart WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Checkout successful, payment assumed to be completed']);
        } else {
            $this->sendError('Failed to checkout');
        }
    }

    public function getCart(int $user_id): void {
        $query = 'SELECT * FROM Cart WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->sendResponse($cartItems);
    }
}

?>