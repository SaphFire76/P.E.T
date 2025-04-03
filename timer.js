let countdown;
const timerDisplay = document.getElementById("timer");
const button = document.querySelector(".catbtn");

var duration = 0.5; 
var timerDuration = duration * 6000;

var circle = document.getElementById('countdown_svg').children[0];

let playerCoins = parseInt(localStorage.getItem("playerCoins")) || 0;
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
        localStorage.setItem("playerCoins", playerCoins);
    }
}

function updateTimerDisplay() {
    let minutes = Math.floor(duration);
    let seconds = Math.floor((duration - minutes) * 60);
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {

    if(localStorage.getItem("timerEndTime")){
        return;
    }

    const startTime = Date.now();
    const endTime = startTime + timerDuration * 10;
    localStorage.setItem("timerEndTime", endTime);
    localStorage.setItem("timerDuration", duration);

    button.disabled = true;
    runTimer();
}

function runTimer() {
    clearInterval(countdown);

    const endTime = localStorage.getItem("timerEndTime");
    if (!endTime) return;

    const storedDuration = localStorage.getItem("timerDuration");
    if(storedDuration){
        duration = parseFloat(storedDuration);
        timerDuration = duration*6000;
    }

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
            localStorage.removeItem("timerDuration");

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

function setTimerDuraction(minutes){
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
            setTimerDuraction(minutes);
        });

    });
}

window.onload = () => {
    updateCoinsDisplay(); 
    timerOption();
    if(localStorage.getItem("timerEndTime")) {
        runTimer(); 
        button.disabled = true;
    }else{
        updateTimerDisplay();
    }
};
