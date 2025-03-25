<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>P.E.T</title>
    <link rel="stylesheet" href="styles.css">
    <script src="timer.js" defer></script>
</head>
<body>
    <!-- PHP code to fetch user data -->
    <?php
    // session_start();
    // $conn = new mysqli('http://192.168.1.129', 'root', '', 'p.e.t database');
    // if ($conn->connect_error) {
    //     die("Connection Failed : " . $conn->connect_error);
    // }

    // Assuming user is logged in and user ID is stored in session
    // if (isset($_SESSION['user_id'])) {
    //     $userId = $_SESSION['user_id'];
    //     $result = $conn->query("SELECT * FROM `user information` WHERE id = $userId");

    //     if ($result->num_rows > 0) {
    //         $user = $result->fetch_assoc();
    //         $coins = $user['currency'];
    //     } else {
            // $coins = 15; 
            // Default value if user not found
           // }
    // } else {
    //     $coins = 15; // Default value if user not logged in
   // }

   // $conn->close();
    ?>
    <script>
    //   const firstName = "<?//php echo $user['firstName'];?>";
    //   const lastName = "<?//php echo $user['lastName'];?>";
    //   const coins = (<?//php echo $coins; ?>);        
      // Assign PHP variables to JavaScript variables
     // window.addEventListener('beforeunload', function() {
       // fetch('logout.php', { method: 'POST' });    
        // Logout user when tab is closed
         
      //});
    </script>
    <!-- UI -->
    <div class="body">

        <!-- Header Ribbon -->
        <div id="header">
            <div class="header" id="header1"></div>
            <div class="header" id="timer"></div>
            <div class="header" id="header1" style="display: flex; justify-content: flex-end;">
                <div id="coins">
                    <img style="height: 2em; background-color: transparent;" src="Coin.png"> 
                    <div id="header1"><?//php echo $coins; ?> 15</div>
                </div>
                <button onclick="window.location.href='logout.php'">Logout</button>
            </div>
        </div>

        <!-- Main Space -->
        <div class="main">
            <svg id="countdown_svg" height="40vh" width="40vh" xmlns="http://www.w3.org/2000/svg">
                <circle r="18vh" cx="20vh" cy="20vh" fill="red" />
            </svg>
            <div class="catTimerOuter">
                <div class="catTimerInner">
                    <button class="catbtn" onclick="startTimer()">
                        <img src="cat.png" alt="cat sleeping">
                    </button>
                </div>
            </div>
        </div>

        <!-- Footer Ribbon -->
        <div class="footer">
            <!-- Shop -->
            <button id="shopBtn">
                <img style="background-color: transparent; width: inherit;" src="shop.png" alt="Shop">
            </button>

            <!-- Settings -->
            <button id="settingBtn">
                <img style="background-color: transparent; width: inherit;" src="settingsIcon.png" alt="Settings">
            </button>

        </div>
    </div>

    <div id="settingModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 id="darkmodeH2">Settings</h2>

            <div class="settingOptions">
                <div class="option">
                    <label class="label">Notification</label>
                    <label class="toggle">
                        <input type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>

            <div class="settingOptions">
                <div class="option">
                    <label class="label">Dark Mode</label>
                    <label class="toggle">
                        <input type="checkbox" id="darkmodeToggle">
                        <span class="slider"></span>
                    </label>
                </div>

            <div class="settingOptions">
                <div class="option">
                    <label class="label">Font</label>
                    <button class="font">x1</button>
                </div>
            </div>

            <!-- Added buttons for login and registration -->
            <div class="settingOptions">
                <div class="option">
                    <button onclick="window.location.href='login.html'">Login</button>
                </div>
                <div class="option">
                    <button onclick="window.location.href='registration.html'">Register</button>
                </div>
            </div>

            </div>
        </div>
    </div>

    <script src="modal.js"></script>
    <script src="darkmode.js"></script>
    <script src="font.js"></script>
</body>
</html>