let countdown;
const timerDisplay = document.getElementById("timer");
const button = document.querySelector(".catbtn");

var duration = 0.5; // Timer duration in minutes
var timerDuration = duration * 6000; // Convert minutes to centiseconds (100ths of a second)

var circle = document.getElementById('countdown_svg').children[0]; // Get the countdown circle

// Coins System
let playerCoins = parseInt(localStorage.getItem("playerCoins")) || 100;
//let playerCoins = coins; //intialise playerCoins with coins from the database;
const coinsDisplay = document.querySelector("#coins #header1");


const timerOptions = {
    "10 Minutes": 10,
    "20 Minutes": 20,
    "30 Mintues": 30,
    "1 Hour": 60
}

function updateCoinsDisplay() {
    if (coinsDisplay) {
        coinsDisplay.textContent = playerCoins;
        localStorage.setItem("playerCoins", playerCoins); // Save coins to localStorage
    }
}

// Set initial timer display
let minutes = Math.floor(duration);
timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:00`;
function updateTimerDisplay() {
    let minutes = Math.floor(duration);
    let seconds = Math.floor((duration - minutes) * 60);
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {

    /*
    if(localStorage.getItem("timerEndTime")){
        return;
    }
    */

    const startTime = Date.now();
    const endTime = startTime + timerDuration * 10; // Store end time in milliseconds
    localStorage.setItem("timerEndTime", endTime); // Save to localStorage

    button.disabled = true; // Disable the button while the timer is running
    const endTime = startTime + timerDuration * 10;
    //localStorage.setItem("timerEndTime", endTime);
    //localStorage.setItem("timerDuration", duration);

    button.disabled = true;
    runTimer(endTime);
}

function runTimer(endTime) {
    clearInterval(countdown);

    /*
    const endTime = localStorage.getItem("timerEndTime");
    if (!endTime) return; // Exit if there's no stored timer

    const storedDuration = localStorage.getItem("timerDuration");
    if(storedDuration){
        duration = parseFloat(storedDuration);
        timerDuration = duration*6000;
    }
    */

    function updateTimer() {
        const currentTime = Date.now();
        let timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 10)); // Calculate remaining time in centiseconds

        let minutes = Math.floor(timeLeft / 6000);
        let seconds = Math.floor((timeLeft % 6000) / 100);
        var dashOffset = -(959 - 959 * (timeLeft / timerDuration));

        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        circle.style.strokeDashoffset = dashOffset.toString();

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "TIME'S UP!";
            circle.style.strokeDashoffset = '0';

            button.disabled = false;
            //localStorage.removeItem("timerEndTime");
            //localStorage.removeItem("timerDuration");
            giveCoins();
        }
    }

    updateTimer(); // Run immediately to update UI
    countdown = setInterval(updateTimer, 10); // Update every second
}

// Function to give coins when the timer ends
function giveCoins() {
    let totalTimeSeconds = duration * 60; // Convert minutes to seconds
    let coinsEarned = Math.floor(totalTimeSeconds / 10); // 1 coin for every 10 seconds

    playerCoins += coinsEarned;

    if (isLoggedIn) {
        // Update coins in the database
        fetch('update_coins.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `coins=${playerCoins}&userId=${userId}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`You earned ${coinsEarned} coins!`);
                updateCoinsDisplay();
            } else {
                console.error('Failed to update coins:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        // Update local display for guest users
        updateCoinsDisplay();
        console.log(`You earned ${coinsEarned} coins!`);
    }
}

// Resume the timer when the page loads
window.onload = () => {
    updateCoinsDisplay(); // Ensure coins display correctly
    if (localStorage.getItem("timerEndTime")) {
        runTimer(); // Resume the timer
        button.disabled = true; // Keep the button disabled
    }
}

function setTimerDuration(minutes){
    duration = minutes;
    timerDuration = duration * 6000;
    updateTimerDisplay();

    const timerModal = document.getElementById("timerModal");
    timerModal.style.display = "none";
}

function timerOption(){
    const timerItems = document.querySelectorAll(".timer-item");
    timerItems.forEach(item =>{
        const optionText = item.querySelector(".timer-options").textContent;
        const minutes = timerOptions[optionText];
        item.addEventListener("click",() => {
            setTimerDuration(minutes);
        });

    });
}

window.onload = () => {
    updateCoinsDisplay(); 
    timerOption();
    updateTimerDisplay();
    /*
    if(localStorage.getItem("timerEndTime")) {
        runTimer(); 
        button.disabled = true;
    }else{
        updateTimerDisplay();
    }
    */
};
