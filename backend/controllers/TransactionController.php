<?php
require_once 'BaseController.php';
require_once __DIR__ . '/../models/Transaction.php';
require_once __DIR__ . '/../config/Database.php';

class TransactionController extends BaseController {
    private PDO $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function addTransaction(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $query = 'INSERT INTO ' . Transaction::getTableName() . ' (user_id, payment_id, order_id, payment_signature) VALUES (:user_id, :payment_id, :order_id, :payment_signature)';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':payment_id', $data['payment_id']);
        $stmt->bindParam(':order_id', $data['order_id']);
        $stmt->bindParam(':payment_signature', $data['payment_signature']);

        if ($stmt->execute()) {
            $transactionId = $this->conn->lastInsertId();
            $transaction = $this->getTransaction($transactionId);

            $this->sendResponse([
                'message' => 'Transaction created successfully',
                'transaction' => $transaction->getTransactionDetails(),
            ], 201);
        } else {
            $this->sendError('Failed to create transaction');
        }
    }

    public function getTransaction(int $id, bool $send = false): ?Transaction {
        $query = 'SELECT * FROM ' . Transaction::getTableName() . ' WHERE transaction_id = :transaction_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':transaction_id', $id);
        $stmt->execute();
        $transaction = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($send) {
            if ($transaction) {
                $this->sendResponse($transaction);
            } else {
                $this->sendError('Transaction not found', 404);
            }
        }

        return new Transaction($transaction);
    }

    public function deleteTransaction(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['transaction_id'];

        if (empty($id)) {
            $this->sendError('Transaction id is required');
        }

        $transaction = $this->getTransaction($id);
        if (empty($transaction)) {
            $this->sendError('Transaction not found', 404);
        }

        $query = 'DELETE FROM ' . Transaction::getTableName() . ' WHERE transaction_id = :transaction_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':transaction_id', $id);
        if ($stmt->execute()) {
            $this->sendResponse(['message' => 'Transaction deleted successfully']);
        } else {
            $this->sendError('Failed to delete transaction');
        }
    }

    public function getAllTransactions(): void {
        $query = 'SELECT * FROM ' . Transaction::getTableName();
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->sendResponse($transactions);
    }
}

?>