let countdown;

const timerDisplay = document.getElementById("timer");
var minutes = 12;
timerDisplay.textContent = `${String(minutes)}:00`;

function startTimer() {
    var timerDuration= minutes * 6000;
    let timeLeft = timerDuration;
    const button = document.querySelector(".catbtn")
    var circle= document.getElementById('countdown_svg').children[0];

    button.disabled = true;

    clearInterval(countdown);

    countdown = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 6000);
        let seconds = Math.floor((timeLeft % 6000)/100);
        var dashOffset= -(959-959*(timeLeft/timerDuration));

        timerDisplay.textContent = `${String(minutes)}:${String(seconds)}`;
        circle.style.strokeDashoffset= dashOffset.toString();

        if (timeLeft <= 0) {    
            clearInterval(countdown);
            timerDisplay.textContent = minutes.toString();
            circle.style.strokeDashoffset= '0';
            //alert("Time's up!");

            button.disabled = false;
        }
        //  else {
        //     timeLeft--;
        // }
    }, 10);
}
