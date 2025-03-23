<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    //Assign variables that take the values from the form

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Database connection
    $conn = new mysqli('localhost','root','','p.e.t database'); //establishes connection to the database
    if($conn->connect_error){
        echo "$conn->connect_error";
        die("Connection Failed : ". $conn->connect_error);	
        //error message if connection fails
    } else {
        // Check if email already exists
        $checkEmailStmt = $conn->prepare("SELECT * FROM `user information` WHERE email = ?");
        $checkEmailStmt->bind_param("s", $email);
        $checkEmailStmt->execute();
        $checkEmailStmt->store_result();        //Select values from the database where email is equal to the email entered, meaining that the email is already used
        
        if ($checkEmailStmt->num_rows > 0) {
            echo "<script>
                    alert('Error: Email is already used.');
                    setTimeout(function() {
                        window.location.href = 'registration.html';
                    }, 1000); // Wait for 5 seconds before redirecting
                  </script>";
                  //error message if email is already used and redirects to registration page
            $checkEmailStmt->close();
            $conn->close();
            exit();
        }

        $checkEmailStmt->close();

        $stmt = $conn->prepare("insert into `user information` (firstName, lastName, email, password, currency) values(?, ?, ?, ?, 15)");	
        //inserts the values into the database 
        $stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword); 
        //binds the parameters
        $execval = $stmt->execute(); 
        //executes the query
        
        
        $stmt->close();
        $conn->close(); //close connection

        header("Location: index.php");
        exit();
    }
?>