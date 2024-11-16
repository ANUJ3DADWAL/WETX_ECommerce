<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Razorpay\Api\Api;

class PaymentController extends BaseController {
    private PDO $conn;
    private Api $razorpay;
    private string $currency = "INR";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
        $this->razorpay = new Api($_ENV['RAZORPAY_KEY_ID'], $_ENV['RAZORPAY_SECRET_KEY']);
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

    public function checkout(array $orderDetails): void {
        // Extract order details
        $order_id = $orderDetails['order_id'];
        $amount = $orderDetails['amount'] * 100; // Convert to paise
        $currency = $orderDetails['currency'];

        $data = [
            "key" => $_ENV['RAZORPAY_KEY_ID'],
            "amount" => $amount,
            "currency" => $currency,
            "name" => "WETX",
            "description" => "Test transaction",
            "image" => "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",
//            "prefill" => [
//                "name" => "Gaurav Kumar",
//                "email" => "gaurav.kumar@example.com",
////                "contact" => "9000090000",
//            ],
            "notes" => [
                "address" => "Razorpay Corporate Office",
                "merchant_order_id" => "12312321",
            ],
            "theme" => [
                "color" => "#3399cc"
            ],
            "order_id" => $order_id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        ];

        $rzp = new Razorpay(options);

//        $json = json_encode($data);
//        require("checkout/{$checkout}.php");

        // Set your callback URL
//        $callback_url = "http://localhost:8000/success.html";
//
//        // Include Razorpay Checkout.js library
//        echo '<script src="https://checkout.razorpay.com/v1/checkout.js"></script>';
//
//        // Create a payment button with Checkout.js
//        echo '<button onclick="startPayment()">Pay with Razorpay</button>';
//
//        // Add a script to handle the payment
//        echo '<script>
//            function startPayment() {
//                var options = {
//                    key: "' . $api_key . '",
//                    amount: "' . $order->amount . '",
//                    currency: "' . $order->currency . '",
//                    name: "Your Company Name",
//                    description: "Payment for your order",
//                    image: "https://cdn.razorpay.com/logos/GhROQceyan79pGE_medium.png",
//                    order_id: "' . $order_id . '",
//                    theme: {
//                        "color": "#738276"
//                    },
//                    callback_url: "' . $callback_url . '"
//                };
//                var rzp = new Razorpay(options);
//                rzp.open();
//            }
//        </script>';


    }

    public function verifyPayment(): void {
        $paymentDetails = json_decode(file_get_contents('php://input', true));

        $razorpayOrderId = $paymentDetails->razorpay_order_id;
        $razorpayPaymentId = $paymentDetails->razorpay_payment_id;
        $razorpaySignature = $paymentDetails->razorpay_signature;

        $generatedSignature = hash_hmac('sha256', $razorpayOrderId . '|' . $razorpayPaymentId, $_ENV['RAZORPAY_SECRET_KEY']);

        if (hash_equals($generatedSignature, $razorpaySignature)) {
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