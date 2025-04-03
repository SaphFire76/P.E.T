<?php
session_start();
header('Content-Type: application/json');

if (!isset($_POST['userId']) || !isset($_POST['coins'])) {  // Check if userId and coins are set in POST request
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

$userId = intval($_POST['userId']);
$newCoins = intval($_POST['coins']);

$conn = new mysqli('localhost', 'root', '', 'p.e.t database');  // Database connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$stmt = $conn->prepare("UPDATE `user information` SET currency = ? WHERE id = ?");      // Prepare SQL statement to prevent SQL injection
$stmt->bind_param('ii', $newCoins, $userId);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'coins' => $newCoins]);    // Return success response with updated coins
} else {
    echo json_encode(['error' => 'Failed to update coins']);
}

$stmt->close();
$conn->close();
?>