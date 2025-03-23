<?php
session_start();
$email = $_POST['email'];
$password = $_POST['password']; // Assign variables that take the values from the form

$conn = new mysqli('localhost', 'root', '', 'p.e.t database');  //Connectuon to the database
if ($conn->connect_error) {
    echo "$conn->connect_error";        
    die("Connection Failed : " . $conn->connect_error); //error message if connection fails
} else {
    $stmt = $conn->prepare("SELECT * FROM `user information` WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();  // Get the result from the query

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if (password_verify($password, $row["password"])) {
                echo "Login successful!";
                $_SESSION['user_id'] = $row['id'];          // Set user ID in session
                header("Location: index.php");      // Redirect to index.php after successful login
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