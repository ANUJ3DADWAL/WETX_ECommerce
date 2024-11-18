<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Cart.php';
require_once __DIR__ . '/../config/Database.php';

class CartController extends BaseController {
    private PDO $conn;
    private UserController $userController;
    private ProductController $productController;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
        $this->userController = new UserController();
        $this->productController = new ProductController();
    }

    public function addItem(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . Cart::getTableName() . ' (user_id, product_id, quantity) VALUES (:user_id, :product_id, :quantity)';
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

    public function updateQuantity(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $user_id = $data['user_id'];
        $product_id = $data['product_id'];
        $quantity = $data['quantity'];

        if (empty($user_id) || empty($product_id) || empty($quantity)) {
            $this->sendError('User ID, Product ID and Quantity all are required');
            return;
        }

        if ($data['quantity'] <= 0) {
            $this->sendError('Quantity must be greater than 0');
        }

        $query = 'UPDATE ' . Cart::getTableName() . ' SET quantity = :quantity WHERE user_id = :user_id AND product_id = :product_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':product_id', $product_id);
        $stmt->bindParam(':quantity', $quantity);

        if ($stmt->execute()) {
            $updatedCart = $this->getCartByUserIdAndProductId($user_id, $product_id);

            $this->sendResponse([
                'message' => 'Cart quantity updated successfully',
                'cart' => $updatedCart->getCartDetails()
            ]);
        } else {
            $this->sendError('Failed to update cart quantity');
        }
    }


    public function removeItem(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $user_id = $data['user_id'];
        $product_id = $data['product_id'];

        if (empty($user_id) || empty($product_id)) {
            $this->sendError('User ID and Product ID are required');
            return;
        }

        $query = 'DELETE FROM ' . Cart::getTableName() . ' WHERE user_id = :user_id AND product_id = :product_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':product_id', $product_id);

        if ($stmt->execute()) {
            $this->sendResponse([
                'message' => 'Item removed from cart successfully'
            ]);
        } else {
            $this->sendError('Failed to remove item from cart');
        }
    }

    // public function checkout(int $user_id): void {
    //     // Fetch all cart items for the user and mark them as paid (implement this logic)
    //     $query = 'SELECT * FROM ' . Cart::getTableName() . ' WHERE user_id = :user_id';
    //     $stmt = $this->conn->prepare($query);
    //     $stmt->bindParam(':user_id', $user_id);
    //     $stmt->execute();
    //     $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     // Assume payment is successful and clear the cart
    //     $query = 'DELETE FROM ' . Cart::getTableName() . ' WHERE user_id = :user_id';
    //     $stmt = $this->conn->prepare($query);
    //     $stmt->bindParam(':user_id', $user_id);
    //     if ($stmt->execute()) {
    //         $this->sendResponse(['message' => 'Checkout successful, payment assumed to be completed']);
    //     } else {
    //         $this->sendError('Failed to checkout');
    //     }
    // }

    public function checkout(int $user_id): void {
        // Fetch all cart items for the user and calculate the final price
        $query = '
            SELECT 
                c.product_id, 
                c.quantity, 
                p.price, 
                (c.quantity * p.price) as total_price 
            FROM ' . Cart::getTableName() . ' c
            JOIN ' . Product::getTableName() . ' p ON c.product_id = p.product_id
            WHERE c.user_id = :user_id
        ';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $finalPrice = 0;
        foreach ($cartItems as $item) {
            $finalPrice += $item['total_price'];
        }

        // Mark the cart items as paid (implement this logic)
        // ...

        // Output or return the final price
        echo 'Final Price: ' . $finalPrice;
    }

    /**
     * @return ?Cart[]
     */
    public function getCart(int $user_id, bool $send = false): ?array {
        $query = '
            SELECT c.*, p.price 
            FROM ' . Cart::getTableName() . ' c
            JOIN ' . Product::getTableName() . ' p ON c.product_id = p.product_id
            WHERE c.user_id = :user_id
        ';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($send) {
            $this->sendResponse($cartItems);
        }

        foreach ($cartItems as &$item) {
            $item = new Cart($item);
        }

        return $cartItems;
    }

    public function getCartByUserIdAndProductId(int $user_id, int $product_id, bool $send = false): ?Cart {
        $query = '
            SELECT c.*, p.price
            FROM ' . Cart::getTableName() . ' c
            JOIN ' . Product::getTableName() . ' p ON c.product_id = p.product_id
            WHERE c.user_id = :user_id AND c.product_id = :product_id
        ';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':product_id', $product_id);

        $stmt->execute();

        $cartItem = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$cartItem) {
            if ($send) {
                http_response_code(404);
                $this->sendError('Cart not found');
            }
            return null;
        }

        if ($send) {
            $this->sendResponse($cartItem);
        }

        return new Cart($cartItem);
    }

    public function checkIfInCartByUserIdAndProductId(string $param, bool $send = false): void {
        $param = explode('&', $param);
        $user_id = $param[0];
        $product_id = $param[1];

        $cart = $this->getCartByUserIdAndProductId($user_id, $product_id);

        if (!empty($cart)) {
            $this->sendResponse(array(
                "found" => true
            ));
        } else {
            $this->sendResponse(array(
                "found" => false
            ));
        }
    }

    public function removeAllCartItemsByUserId(int $user_id): void {
        $query = 'DELETE FROM ' . Cart::getTableName() . ' WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);

        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'All cart items removed successfully']);
        } else {
            $this->sendError('Failed to remove cart items');
        }
    }
}

?>