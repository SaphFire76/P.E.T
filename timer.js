let countdown;

function startTimer() {
    let timeLeft = 25 * 60;
    const timerDisplay = document.getElementById("timer");

    clearInterval(countdown);

    countdown = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {    
            clearInterval(countdown);
            timerDisplay.textContent = "00:00"; 
            alert("Time's up!");
        } else {
            timeLeft--;
        }
    }, 1000);
}
