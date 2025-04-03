<?php
session_start();
header('Content-Type: application/json');

if (!isset($_POST['userId']) || !isset($_POST['coins'])) {
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

$userId = intval($_POST['userId']);
$newCoins = intval($_POST['coins']);

$conn = new mysqli('localhost', 'root', '', 'p.e.t database');
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

// Fetch the current coins from the database
$result = $conn->query("SELECT currency FROM `user information` WHERE id = $userId");
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $currentCoins = intval($row['currency']);

    // Only update if the new coins value is different
    if ($newCoins !== $currentCoins) {
        $stmt = $conn->prepare("UPDATE `user information` SET currency = ? WHERE id = ?");
        $stmt->bind_param('ii', $newCoins, $userId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'coins' => $newCoins]);
        } else {
            echo json_encode(['error' => 'Failed to update coins']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => true, 'coins' => $currentCoins]); // No update needed
    }
} else {
    echo json_encode(['error' => 'User not found']);
}

$conn->close();
?>