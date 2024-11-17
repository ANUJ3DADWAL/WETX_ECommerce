<?php

class Transaction {
    private const TABLE = 'transactions';

    private int $transaction_id;
    private int $user_id;
    private string $payment_id;
    private string $order_id;
    private string $payment_signature;
    private string $created_at;

    // Constructor
    public function __construct(array $data) {
        $this->transaction_id = $data['transaction_id'];
        $this->user_id = $data['user_id'];
        $this->payment_id = $data['payment_id'];
        $this->order_id = $data['order_id'];
        $this->payment_signature = $data['payment_signature'];
        $this->created_at = $data['created_at'];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getTransactionDetails(): array {
        return [
            'transaction_id' => $this->getTransactionId(),
            'user_id' => $this->getUserId(),
            'payment_id' => $this->getPaymentId(),
            'order_id' => $this->getOrderId(),
            'payment_signature' => $this->getPaymentSignature(),
            'created_at' => $this->getCreatedAt(),
        ];
    }

    // Getters and Setters
    public function getTransactionId(): int {
        return $this->transaction_id;
    }

    public function getUserId(): int {
        return $this->user_id;
    }

    public function setUserId(int $user_id): void {
        $this->user_id = $user_id;
    }

    public function getPaymentId(): string {
        return $this->payment_id;
    }

    public function setPaymentId(string $payment_id): void {
        $this->payment_id = $payment_id;
    }

    public function getOrderId(): string {
        return $this->order_id;
    }

    public function setOrderId(string $order_id): void {
        $this->order_id = $order_id;
    }

    public function getPaymentSignature(): string {
        return $this->payment_signature;
    }

    public function setPaymentSignature(string $payment_signature): void {
        $this->payment_signature = $payment_signature;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}

?>