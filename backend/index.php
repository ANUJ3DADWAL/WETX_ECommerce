<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Content-Type: application/json; charset=UTF-8");

// set_error_handler(function($errno, $errstr, $errfile, $errline) {
//     http_response_code(500);
//     echo json_encode([
//         'error' => true,
//         'message' => $errstr,
//         'file' => $errfile,
//         'line' => $errline
//     ]);
//     exit();
// });

// set_exception_handler(function($exception) {
//     http_response_code(500);
//     echo json_encode([
//         'error' => true,
//         'message' => $exception->getMessage(),
//         'file' => $exception->getFile(),
//         'line' => $exception->getLine()
//     ]);
//     exit();
// });

// ini_set('display_errors', 0);
// ini_set('display_startup_errors', 0);
// error_reporting(E_ALL);

// $request_method = $_SERVER["REQUEST_METHOD"];
// $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// $current_dir = dirname($_SERVER['SCRIPT_NAME']);
// $endpoint = str_replace($current_dir, '', $uri);

// require_once 'controllers/UserController.php';
// require_once 'controllers/CategoryController.php';
// require_once 'controllers/ProductController.php';
// require_once 'controllers/OrderController.php';
// require_once 'controllers/CartController.php';

// $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// $uri = explode('/', $uri);

// $controllerName = ucfirst($uri[1]) . 'Controller';
// $methodName = $uri[2];
// $id = isset($uri[3]) ? $uri[3] : null;

// if (class_exists($controllerName) && method_exists($controllerName, $methodName)) {
//     $controller = new $controllerName();
//     $controller->$methodName($id);
// } else {
//     http_response_code(404);
//     echo json_encode(['error' => true, 'message' => 'Not Found']);
// }

?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $errstr,
        'file' => $errfile,
        'line' => $errline
    ]);
    exit();
});

set_exception_handler(function($exception) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $exception->getMessage(),
        'file' => $exception->getFile(),
        'line' => $exception->getLine()
    ]);
    exit();
});

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

$request_method = $_SERVER["REQUEST_METHOD"];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', trim($uri, '/'));

require_once 'controllers/UserController.php';
require_once 'controllers/CategoryController.php';
require_once 'controllers/ProductController.php';
require_once 'controllers/OrderController.php';
require_once 'controllers/CartController.php';

$n = count($uri);

if ($n < 2) {
    http_response_code(400);
    echo json_encode(['error' => true, 'message' => 'Invalid request']);
    exit();
}

$controllerName = ucfirst($uri[$n - 2]) . 'Controller';
$methodName = $uri[$n - 1];
$id = isset($uri[$n - 3]) ? $uri[$n - 3] : null;

if (class_exists($controllerName) && method_exists($controllerName, $methodName)) {
    $controller = new $controllerName();
    if ($id) {
        $controller->$methodName($id);
    } else {
        $controller->$methodName();
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => true, 'message' => 'Not Found']);
}
?>