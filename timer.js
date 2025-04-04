let countdown; //Timer countdown

//DOM elements
const timerDisplay = document.getElementById("timer");
const button = document.querySelector(".catbtn");

const workDuration = 25; //Pomodoro timer work duration
const breakDuration = 5; //Pomodoro timer break duration
let workSession = true; //Boolean for current session
let totalMinutes = 0; //Total minutes selected for timer session
let remainingTotalMinutes = 0; //remanining minutes in overall session
let currentMinutes = workDuration; //Minutes in the current work/break duration
let timerDuration = workDuration * 6000; //Duration in 10th of seconds

var circle = document.getElementById('countdown_svg').children[0]; //SVG file for visual countdown

let playerCoins = parseInt(localStorage.getItem("playerCoins")) || 0; //Loads the coinds from storage or default to 0
const coinsDisplay = document.querySelector("#coins #header1"); //Coins display

const timerOptionBtn = document.querySelectorAll(".timer-item"); //Time button

//Timer options
const timerOptions = {
    "30 Minutes": 30,
    "1 Hour": 60,
    "1.5 Hours": 90,
    "2 Hours": 120
}

//Updtes the coins display
function updateCoinsDisplay(){
    if(coinsDisplay){
        coinsDisplay.textContent = playerCoins; 
        localStorage.setItem("playerCoins", playerCoins); //Saves accumulated coins in local storage
    }
}

//Updates the timer display with current remaning time
function updateTimerDisplay(){
    let displayMinutes = totalMinutes == 0 ? 0 : remainingTotalMinutes + currentMinutes; //Displays 00:00 upon launch
    //let displayMinutes = remainingTotalMinutes + currentMinutes;
    let minutes = Math.floor(displayMinutes);
    let seconds = 0;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`; //Displays timer format to 00:00
}

//Starts the timer
function startTimer(){
    if(totalMinutes == 0){  //Doesnt start the timer if no duration has been selected
        return;
    }
    
    //Plays sounds if selected
    if (window.soundControls && window.soundControls.startSound) {
        window.soundControls.startSound();
    }

    //Disables timer options to prevent conflict
    timerOptionBtn.forEach(button => {
        button.disabled = true;
    });

    //Timer settings
    currentMinutes = workDuration;
    timerDuration = currentMinutes * 6000;
    workSession = true;
    circle.style.stroke = "#e25100"; //Orange colour SVG
    
    //Calculates end time
    const startTime = Date.now();
    const endTime = startTime + timerDuration * 10;
    //localStorage.setItem("timerEndTime", endTime);
    //localStorage.setItem("timerDuration", duration);
    button.disabled = true; //Disables the button while the timer is running
    

    button.disabled = true;
    runTimer(endTime); //Begins countdown
}

//Runs the countdown timer
function runTimer(endTime){
    clearInterval(countdown); //CLears any existing timer

    //Updates timer display and checks for completion
    function updateTimer(){
        const currentTime = Date.now();
        let timeLeft = Math.max(0, Math.floor((endTime - currentTime)/ 10));  //Calculates time left

        //Calcualtes the values to display
        let minutes = Math.floor(timeLeft / 6000);
        let seconds = Math.floor((timeLeft % 6000) / 100);
        var dashOffset = -(959 - 959 *(timeLeft / timerDuration));

        //Updates the display
        let displayMinutes = remainingTotalMinutes + minutes;
        timerDisplay.textContent = `${String(displayMinutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        circle.style.strokeDashoffset = dashOffset.toString();

        //Checks if currents work duration is complete
        if (timeLeft <= 0){
            clearInterval(countdown);
            if (workSession){
                timerDisplay.textContent = "BREAK TIME!";
                giveCoins(); //Coins are given as reward
                
                workSession = false;
                currentMinutes = breakDuration;
                circle.style.stroke = "#00e246"; //Green SVG colour indicates break
            }else{
                //Switches back to work time when break period is complete
                timerDisplay.textContent = "WORK TIME!";                
                remainingTotalMinutes = Math.max(0, remainingTotalMinutes - (workDuration + breakDuration));
                
                if(remainingTotalMinutes > 0){
                    workSession = true;
                    currentMinutes= Math.min(workDuration, remainingTotalMinutes);
                    circle.style.stroke = "#e25100";
                }
            }
            
            //Continues to the next work duration
            if(remainingTotalMinutes > 0 || !workSession){
                timerDuration = currentMinutes * 6000;
                const newEndTime = Date.now() + timerDuration * 10;
                runTimer(newEndTime);
            }else{
                //When entire session has been complete
                timerDisplay.textContent = "COMPLETED!";
                circle.style.strokeDashoffset = '0';
                button.disabled = false;
                timerOptionBtn.forEach(button => { //Enables timer buttons
                    button.disabled = false;
                });
                //Stops background sounds
                if (window.soundControls && window.soundControls.stopSound) {
                    window.soundControls.stopSound();
                }
            }
        }
    }

    updateTimer();
    countdown = setInterval(updateTimer, 10); 
}

//Award system of coins once work session has been completed
function giveCoins(){
    let coinsEarned = Math.floor(workDuration * 60 / 10); //1 coins per 10 seconds
    playerCoins += coinsEarned; 
    updateCoinsDisplay(); 
    console.log(`You earned ${coinsEarned} coins!`);
}

//Sets the total timer durations
function setTimerDuration(minutes){
    if (!button.disabled) { //Allows change in timer when timer is not running
        totalMinutes = minutes;
        remainingTotalMinutes = minutes - workDuration;
        updateTimerDisplay();
   
        //Hides the timer modal
        const timerModal = document.getElementById("timerModal");
        timerModal.style.display = "none";
    }
}

//Sets up the timer option buttons
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

//Initialises as soon as the page loads
window.onload = () => {
    updateCoinsDisplay(); 
    timerOption();
    updateTimerDisplay();
    
    //SVG animation
    circle.setAttribute("stroke-dasharray", "959");
    circle.setAttribute("stroke-dashoffset", "0");
    circle.style.stroke = "#e25100";
};