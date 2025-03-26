let countdown;

const timerDisplay = document.getElementById("timer");
var duration = 0.5; // SET TIMER WITH THIS VARIABLE. (DURATION IN MINUTES).
var minutes = Math.floor(duration);
//var seconds = (duration- minutes)*60; 
timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:00`;

function startTimer() {
    var timerDuration= duration * 6000;
    let timeLeft = timerDuration;
    const button = document.querySelector(".catbtn")
    var circle= document.getElementById('countdown_svg').children[0];

    button.disabled = true;

    clearInterval(countdown);

    countdown = setInterval(() => {
        // timeLeft--;
        let minutes = Math.floor(timeLeft / 6000);
        let seconds = Math.floor((timeLeft % 6000)/100);
        var dashOffset= -(959-959*(timeLeft/timerDuration));

        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        circle.style.strokeDashoffset= dashOffset.toString();

        if (timeLeft <= 0) {    
            clearInterval(countdown);
            timerDisplay.textContent = "TIME'S UP!";
            circle.style.strokeDashoffset= '0';
            //alert("Time's up!");

            button.disabled = false;
        }
        else {
            timeLeft--;
        }
    }, 10);
}
