<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    //Assing variables that take the values from the form

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Database connection
    $conn = new mysqli('localhost','root','','p.e.t database'); //establishes connection to the database
    if($conn->connect_error){
        echo "$conn->connect_error";
        die("Connection Failed : ". $conn->connect_error);	
		//error message if connection fails
    } else {
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