<?php
class Database {
    private string $host = 'localhost';
    private string $db_name = 'ecom';
    private string $username = 'root';
    private string $password = '';
    private PDO $conn;

    public function connect() :PDO{
        // $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfully";
        } catch(PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }

        return $this->conn;
    }
}
$obj=new Database();
$obj->connect();

?>