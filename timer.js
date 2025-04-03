let countdown;
const timerDisplay = document.getElementById("timer");
const button = document.querySelector(".catbtn");

const workDuration = 25;
const breakDuration = 5;
let workSession = true;
let totalMinutes = 0;
let remainingTotalMinutes = 0;
let currentMinutes = workDuration;
let timerDuration = workDuration * 6000;

var circle = document.getElementById('countdown_svg').children[0];

let playerCoins = parseInt(localStorage.getItem("playerCoins")) || 0;
const coinsDisplay = document.querySelector("#coins #header1");

const timerOptionBtn = document.querySelectorAll(".timer-item");

const timerOptions = {
    "30 Minutes": 30,
    "1 Hour": 60,
    "1.5 Hours": 90,
    "2 Hours": 120
}

function updateCoinsDisplay(){
    if(coinsDisplay){
        coinsDisplay.textContent = playerCoins; 
        localStorage.setItem("playerCoins", playerCoins);
    }
}

function updateTimerDisplay(){
    let displayMinutes = totalMinutes == 0 ? 0 : remainingTotalMinutes + currentMinutes;
    //let displayMinutes = remainingTotalMinutes + currentMinutes;
    let minutes = Math.floor(displayMinutes);
    let seconds = 0;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer(){
    if(totalMinutes == 0){ 
        return;
    }
    if (window.soundControls && window.soundControls.startSound) {
        window.soundControls.startSound();
    }
    timerOptionBtn.forEach(button => {
        button.disabled = true;
    });

    currentMinutes = workDuration;
    timerDuration = currentMinutes * 6000;
    workSession = true;
    circle.style.stroke = "#e25100";
    
    const startTime = Date.now();
    const endTime = startTime + timerDuration * 10;
    //localStorage.setItem("timerEndTime", endTime);
    //localStorage.setItem("timerDuration", duration);
    button.disabled = true; // Disable the button while the timer is running
    

    button.disabled = true;
    runTimer(endTime);
}

function runTimer(endTime){
    clearInterval(countdown);

    function updateTimer(){
        const currentTime = Date.now();
        let timeLeft = Math.max(0, Math.floor((endTime - currentTime)/ 10)); 

        let minutes = Math.floor(timeLeft / 6000);
        let seconds = Math.floor((timeLeft % 6000) / 100);
        var dashOffset = -(959 - 959 *(timeLeft / timerDuration));

        let displayMinutes = remainingTotalMinutes + minutes;
        timerDisplay.textContent = `${String(displayMinutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        circle.style.strokeDashoffset = dashOffset.toString();

        if (timeLeft <= 0){
            clearInterval(countdown);
            if (workSession){
                timerDisplay.textContent = "BREAK TIME!";
                giveCoins();
                
                workSession = false;
                currentMinutes = breakDuration;
                circle.style.stroke = "#00e246";
            }else{
                timerDisplay.textContent = "WORK TIME!";                
                remainingTotalMinutes = Math.max(0, remainingTotalMinutes - (workDuration + breakDuration));
                
                if(remainingTotalMinutes > 0){
                    workSession = true;
                    currentMinutes= Math.min(workDuration, remainingTotalMinutes);
                    circle.style.stroke = "#e25100";
                }
            }
            
            if(remainingTotalMinutes > 0 || !workSession){
                timerDuration = currentMinutes * 6000;
                const newEndTime = Date.now() + timerDuration * 10;
                runTimer(newEndTime);
            }else{
                timerDisplay.textContent = "COMPLETED!";
                circle.style.strokeDashoffset = '0';
                button.disabled = false;
                timerOptionBtn.forEach(button => {
                    button.disabled = false;
                });
                if (window.soundControls && window.soundControls.stopSound) {
                    window.soundControls.stopSound();
                }
            }
        }
    }

    updateTimer();
    countdown = setInterval(updateTimer, 10); 
}

function giveCoins(){
    let coinsEarned = Math.floor(workDuration * 60 / 10);
    playerCoins += coinsEarned; 
    updateCoinsDisplay(); 
    console.log(`You earned ${coinsEarned} coins!`);
}

function setTimerDuration(minutes){
    if (!button.disabled) {
        totalMinutes = minutes;
        remainingTotalMinutes = minutes - workDuration;
        updateTimerDisplay();
   
        const timerModal = document.getElementById("timerModal");
        timerModal.style.display = "none";
    }
}

function timerOption(){
    const timerItems = document.querySelectorAll(".timer-item");
    timerItems.forEach(item => {
        const optionText = item.querySelector(".timer-options").textContent;
        const minutes = timerOptions[optionText];
        item.addEventListener("click", () => {
            setTimerDuration(minutes);
        });
    });
}

window.onload = () => {
    updateCoinsDisplay(); 
    timerOption();
    updateTimerDisplay();
    
    circle.setAttribute("stroke-dasharray", "959");
    circle.setAttribute("stroke-dashoffset", "0");
    circle.style.stroke = "#e25100";
};