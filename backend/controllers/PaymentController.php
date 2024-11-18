<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../controllers/TransactionController.php';

use Razorpay\Api\Api;

class PaymentController extends BaseController {
    private PDO $conn;
    private Api $razorpay;
    private string $currency = "INR";
    private TransactionController $transactionController;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
        $this->razorpay = new Api($_ENV['RAZORPAY_KEY_ID'], $_ENV['RAZORPAY_SECRET_KEY']);
        $this->transactionController = new TransactionController();
    }

    public function createOrder(int $user_id): void {
        // Fetch cart items and calculate total amount
        $cartController = new CartController();
        $cartItems = $cartController->getCart($user_id);
        $totalAmount = array_reduce($cartItems, function ($sum, $item) {
            return $sum + ($item->getQuantity() * $item->getPrice());
        }, 0);

        // Create Razorpay order
        $orderData = [
            'receipt' => uniqid(),
            'amount' => $totalAmount * 100, // amount in paise
            'currency' => $this->currency,
            // 'payment_capture' => 1 // auto capture
        ];

        $razorpayOrder = $this->razorpay->order->create($orderData);

        // Return order details
        $this->sendResponse([
//            'order_id' => $razorpayOrder['id'],
            'order_id' => $razorpayOrder->id,
            'amount' => $totalAmount,
            'currency' => 'INR'
        ]);
    }

    public function verifyPayment(): void {
        $paymentDetails = json_decode(file_get_contents('php://input', true));

        $razorpayOrderId = $paymentDetails->razorpay_order_id;
        $razorpayPaymentId = $paymentDetails->razorpay_payment_id;
        $razorpaySignature = $paymentDetails->razorpay_signature;
        $user_id = $paymentDetails->userId;

        $generatedSignature = hash_hmac('sha256', $razorpayOrderId . '|' . $razorpayPaymentId, $_ENV['RAZORPAY_SECRET_KEY']);

        if (hash_equals($generatedSignature, $razorpaySignature)) {
//            $this->transactionController->addTransaction([
//                'user_id' => $user_id,
//                'payment_id' => $razorpayPaymentId,
//                'order_id' => $razorpayOrderId,
//                'payment_signature' => $razorpaySignature,
//            ]);

            $this->sendResponse([
                'status' => 'success',
                'message' => 'Payment verified successfully'
            ]);
        } else {
            $this->sendError([
                'status' => 'failed',
                'message' => 'Payment failed'
            ]);
        }
    }
}