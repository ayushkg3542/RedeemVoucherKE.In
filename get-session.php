<?php
session_start();
header('Content-Type: application/json');

// Initialize booking session if not exists
if (!isset($_SESSION['booking'])) {
    $_SESSION['booking'] = [
        'location' => null,
        'destination' => null,
        'resort' => null
    ];
}

echo json_encode([
    'success' => true,
    'data' => $_SESSION['booking']
]);
?>
