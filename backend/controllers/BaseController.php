<?php

class BaseController {
    protected function sendResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit();
    }

    protected function sendError($message, $statusCode = 400) {
        http_response_code($statusCode);
        echo json_encode(['error' => true, 'message' => $message]);
        exit();
    }
}
?>