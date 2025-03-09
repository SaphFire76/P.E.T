let countdown;

function startTimer() {
    var timerDuration= 3000;
    let timeLeft = timerDuration;
    const timerDisplay = document.getElementById("timer");
    const button = document.querySelector(".catbtn")
    var circle= document.getElementById('countdown_svg').children[0];

    button.disabled = true;

    clearInterval(countdown);

    countdown = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 6000);
        let seconds = Math.floor((timeLeft % 6000)/100);
        var dashOffset= -(959-959*(timeLeft/timerDuration));

        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        circle.style.strokeDashoffset= dashOffset.toString();

        if (timeLeft <= 0) {    
            clearInterval(countdown);
            timerDisplay.textContent = "25:00";
            circle.style.strokeDashoffset= '0';
            //alert("Time's up!");

            button.disabled = false;
        }
        //  else {
        //     timeLeft--;
        // }
    }, 10);
}
