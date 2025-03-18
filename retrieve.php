<?php
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
            // Debugging: Print the hashed password from the database
            echo "Hashed password from DB: " . $row["password"] . "<br>";
            // Debugging: Print the input password
            echo "Input password: " . $password . "<br>";

            if (password_verify($password, $row["password"])) {
                echo "Login successful!";
                // Print the data of the database row
                echo "ID: " . $row["id"] . " - First Name: " . $row["firstName"] . " - Last Name: " . $row["lastName"] . " - Email: " . $row["email"] . " - Currency: " . $row["currency"] . "<br>";
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