<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['type']) || !isset($data['value'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$type = $data['type']; // 'location', 'destination', or 'resort'
$value = $data['value'];

// Initialize booking session if not exists
if (!isset($_SESSION['booking'])) {
    $_SESSION['booking'] = [
        'location' => null,
        'destination' => null,
        'resort' => null
    ];
}

// Store the value based on type
switch ($type) {
    case 'location':
        $_SESSION['booking']['location'] = $value;
        // Reset destination and resort when location changes
        $_SESSION['booking']['destination'] = null;
        $_SESSION['booking']['resort'] = null;
        break;
    case 'destination':
        $_SESSION['booking']['destination'] = $value;
        // Reset resort when destination changes
        $_SESSION['booking']['resort'] = null;
        break;
    case 'resort':
        $_SESSION['booking']['resort'] = $value;
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid type']);
        exit;
}

echo json_encode([
    'success' => true,
    'message' => ucfirst($type) . ' saved successfully',
    'data' => $_SESSION['booking']
]);
?>
