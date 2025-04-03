let countdown;
const timerDisplay = document.getElementById("timer");
const button = document.querySelector(".catbtn");

var duration = 0.5; // Timer duration in minutes
var timerDuration = duration * 6000; // Convert minutes to centiseconds (100ths of a second)

var circle = document.getElementById('countdown_svg').children[0]; // Get the countdown circle

// Coins System
let playerCoins = parseInt(localStorage.getItem("playerCoins")) || 100;
const coinsDisplay = document.querySelector("#coins #header1");

function updateCoinsDisplay() {
    if (coinsDisplay) {
        coinsDisplay.textContent = playerCoins;
        localStorage.setItem("playerCoins", playerCoins); // Save coins to localStorage
    }
}

// Set initial timer display
let minutes = Math.floor(duration);
timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:00`;

function startTimer() {
    const startTime = Date.now();
    const endTime = startTime + timerDuration * 10; // Store end time in milliseconds
    localStorage.setItem("timerEndTime", endTime); // Save to localStorage

    button.disabled = true; // Disable the button while the timer is running

    runTimer();
}

function runTimer() {
    clearInterval(countdown); // Clear any existing timer

    const endTime = localStorage.getItem("timerEndTime");
    if (!endTime) return; // Exit if there's no stored timer

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
            localStorage.removeItem("timerEndTime"); // Clear the saved timer

            giveCoins(); // Give coins when the timer ends
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
    updateCoinsDisplay();

    console.log(`You earned ${coinsEarned} coins!`); // Debugging message
}

// Resume the timer when the page loads
window.onload = () => {
    updateCoinsDisplay(); // Ensure coins display correctly
    if (localStorage.getItem("timerEndTime")) {
        runTimer(); // Resume the timer
        button.disabled = true; // Keep the button disabled
    }
};
