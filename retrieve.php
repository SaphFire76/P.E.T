<?php
session_start();
$email = $_POST['email'];
$password = $_POST['password'];

$conn = new mysqli('localhost', 'root', '', 'p.e.t database');
if ($conn->connect_error) {
    echo "$conn->connect_error";
    die("Connection Failed : " . $conn->connect_error);
} else {
    $stmt = $conn->prepare("SELECT * FROM `user information` WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if (password_verify($password, $row["password"])) {
                echo "Login successful!";
                $_SESSION['user_id'] = $row['id']; // Set user ID in session
                // Redirect to index.php after successful login
                header("Location: index.php");
                exit();
            } else {
                echo "Incorrect password.";
            }
        }
    } else {
        echo "No users found with email " . $email;
    }

    $stmt->close();
    $conn->close();
}
?>