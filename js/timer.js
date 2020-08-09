var timeLeft = document.getElementById("time-slider").value;
var timerStarted = false;
var intervalTimer;

document.getElementById("timer-container").innerHTML = timeLeft;

function tick() {
	if (timeLeft-- - 1 != 0) {
		document.getElementById("timer-container").innerHTML = timeLeft;
	} else {
		stopTimer();
		loseAudio.play();

		document.getElementById("message-container").style.background = "var(--dark-gray)";
		document.getElementById("user-name").innerHTML = "The Prompt Was: " + prompt;
		document.getElementById("user-message").innerHTML = "";
	}
}

function startTimer() {
	timerStarted = true;
	timeLeft = document.getElementById("time-slider").value;
	clearInterval(intervalTimer);
	document.getElementById("timer-container").innerHTML = timeLeft;
	intervalTimer = window.setInterval(tick, 1000);
}

function stopTimer() {
	paused = true;
	timerStarted = false;
	
	clearInterval(intervalTimer);
	timeLeft = document.getElementById("time-slider").value;
	document.getElementById("timer-container").innerHTML = timeLeft;
}


function updateInitialTime() {
	if (!timerStarted) {
		timeLeft = document.getElementById("time-slider").value;
		document.getElementById("timer-container").innerHTML = timeLeft;
	}
}