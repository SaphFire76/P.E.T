let countdown;
const timerDisplay = document.getElementById("timer");
const button = document.querySelector(".catbtn");

var duration = 0.5; 
var timerDuration = duration * 6000; 

var circle = document.getElementById('countdown_svg').children[0];

let playerCoins = parseInt(localStorage.getItem("playerCoins"));
const coinsDisplay = document.querySelector("#coins #header1");

function updateCoinsDisplay() {
    if (coinsDisplay) {
        coinsDisplay.textContent = playerCoins;
        localStorage.setItem("playerCoins", playerCoins);
    }
}

let minutes = Math.floor(duration);
timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:00`;

function startTimer() {
    const startTime = Date.now();
    const endTime = startTime + timerDuration * 10;
    localStorage.setItem("timerEndTime", endTime); 

    button.disabled = true;

    runTimer();
}

function runTimer() {
    clearInterval(countdown); 

    const endTime = localStorage.getItem("timerEndTime");
    if (!endTime) return; 

    function updateTimer() {
        const currentTime = Date.now();
        let timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 10));

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
            localStorage.removeItem("timerEndTime"); 

            giveCoins(); 
        }
    }

    updateTimer(); 
    countdown = setInterval(updateTimer, 10); 
}

function giveCoins() {
    let totalTimeSeconds = duration * 60; 
    let coinsEarned = Math.floor(totalTimeSeconds / 10); 

    playerCoins += coinsEarned;
    updateCoinsDisplay();

    console.log(`You earned ${coinsEarned} coins!`); 
}

window.onload = () => {
    updateCoinsDisplay(); 
    if (localStorage.getItem("timerEndTime")) {
        runTimer(); 
        button.disabled = true; 
    }
};
