<?php
session_start();
session_unset();
session_destroy();
header("Location: index.php");
exit(); // Destroy session and redirect to index.php
?>