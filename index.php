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
    
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    session_start();
    $conn = new mysqli('localhost', 'root', '', 'p.e.t database');
    if ($conn->connect_error) {
        die("Connection Failed : " . $conn->connect_error);
    }

    // Initialize isLoggedIn variable
    $isLoggedIn = false;

    // Check if user is logged in
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $result = $conn->query("SELECT * FROM `user information` WHERE id = $userId");

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $coins = $user['currency'];
            $isLoggedIn = true; // User is logged in
        } else {
            $coins = 15; // Default value if user not found
        }
    } else {
        $coins = 15; // Default value if user not logged in
    }

    $conn->close();
    ?>
    <script>
        // Pass the isLoggedIn variable to JavaScript
        const isLoggedIn = <?php echo json_encode($isLoggedIn); ?>;
        const coins = <?php echo $coins; ?>; // Pass coins to JavaScript
    </script>
   <body>
        <!-- UI -->
        <div class="body">

            <!-- Header Ribbon -->
            <div id="header">
                <div class="header" id="header1"></div>
                <div class="header" id="timer"></div>
                <div class="header" id="header1" style="display: flex; justify-content: flex-end;">
                    <div id="coins">
                        <img style="height: 2em; background-color: transparent;" src="Coin.png"> 
                        <div id="header1"></div>
                    </div>
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

                <button id="hangerBtn">
                    <img style="background-color: transparent; width: inherit;" src="hanger.png" alt="Shop">
                </button>

                <!-- Timer -->
                <button id="timerBtn">
                    <img style="background-color: transparent; width: inherit;" src="timer.png" alt="Timer">
                </button>

                <button id="soundBtn">
                    <img style="background-color: transparent; width: inherit;" src="music.png" alt="Sound">
                </button>

                <!-- Settings -->
                <button id="settingBtn">
                    <img style="background-color: transparent; width: inherit;" src="settingsIcon.png" alt="Settings">
                </button>

                <!-- Login Button (New) -->
                <button id="loginBtn">
                    <img style="background-color: transparent; width: inherit;" src="login.png" alt="Login">
                </button>
            </div>
        </div>

        <!-- Shop Modal -->
        <div id="shopModal" class="modal shop-modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 id="darkmodeH2">Shop</h2>

                <div class="shop-grid">
                    <button class="shop-item">
                        <img src="petfood.png" alt="Item 1">
                        <span class="price">5 Coins</span>
                    </button>
                    <button class="shop-item">
                        <img src="waterbottle.png" alt="Item 2">
                        <span class="price">3 Coins</span>
                    </button>
                    <button class="shop-item">
                        <img src="tophat.png" alt="Item 3">
                        <span class="price">60 coins</span>
                    </button>
                    <button class="shop-item">
                        <img src="scarf.png" alt="Item 4">
                        <span class="price">15 coins</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Wardrobe -->
        <div id="hangerModal" class="modal hanger-modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 id="darkmodeH2">Wardrobe</h2>

                <div class="outfitSelector">
                    <button class="previousOutfit">&lt;</button>
                    <div class="outfitDisplay">
                        <img id="currentOutfit" src="cat.png" alt="Current Outfit">
                        <div id="outfitStatus"></div>
                    </div>
                    <button class="nextOutfit">&gt;</button>
                </div>
                <button id="selectOutfit">Select Outfit</button>
            </div>
        </div>

        <!-- Timer Modal -->
        <div id="timerModal" class="modal timer-modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 id="darkmodeH2">Timer</h2>

                <div class="timer-grid">
                    <button class="timer-item">
                        <span class="timer-options">30 Minutes</span>
                    </button>
                    <button class="timer-item">
                        <span class="timer-options">1 Hour</span>
                    </button>
                    <button class="timer-item">
                        <span class="timer-options">1.5 Hours</span>
                    </button>
                    <button class="timer-item">
                        <span class="timer-options">2 Hours</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Sound -->
        <div id="soundModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 id="darkmodeH2">Sound</h2>

                <div class="sound-grid">
                    <button class="sound-item" data-sound="rain">Rain
                        <img src="rain.png" alt="Rain Image">
                    </button>
                    <button class="sound-item" data-sound="fireplace">Fireplace
                        <img src="campfire.png" alt="Fireplace Image">
                    </button>
                    <button class="sound-item" data-sound="brownNoise">Brown Noise
                        <img src="brownnoise.png" alt="BrownNoise Image">
                    </button>
                </div>
            </div>
        </div>

            <!-- Login Modal -->
        <div id="loginModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 id="darkmodeH2">Login</h2>

                <div class="login">
                    <!-- Login Button -->
                    <button class="login-item" onclick="window.location.href='login.html'">
                        <span class="login-options">Login</span>
                    </button>
                    <!-- Logout Button -->
                    <button class="login-item" onclick="window.location.href='logout.php'">
                        <span class="login-options">Logout</span>
                    </button>
                    <!-- Registration Button -->
                    <button class="login-item" onclick="window.location.href='registration.html'">
                        <span class="login-options">Register</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Setting Modal -->
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
                        </label>
                    </div>
                </div>

                </div>
            </div>
        </div>

        <!-- Scripts -->
        <script src="modal.js"></script>
        <script src="darkmode.js"></script>
        <script src="font.js"></script>
        <script src="shop.js"></script>
        <script src="hanger.js"></script>
        <script src="sound.js"></script>
    </body>
</html>
