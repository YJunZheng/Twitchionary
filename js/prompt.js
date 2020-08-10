var promptWindow;
var pool = getPool();
var promptAll = ""; // includes the whole line with alts
localStorage.promptVisibility = "false";

function updatePromptPool(id) {	// updates prompt pool
	promptPool[id][0] = document.getElementById(id).checked;
	pool = getPool();

	if (pool.length == 0) {
		document.getElementById("new-prompt-button").disabled = true;
	} else {
		document.getElementById("new-prompt-button").disabled = false;
	}
}

function getPool() {	// get the current pool of keywords
	let returnPool = [];

	for (var i in promptPool) {
		if (promptPool.hasOwnProperty(i)) {
			if (promptPool[i][0]) {
				returnPool = returnPool.concat(promptPool[i][1]);
			}
		}
	}

	return returnPool;
}

function promptPopup() { // occurrs when new prompt button is pressed
	paused = false;

	// reset timer
	startTimer();
	clearCanvas();

	document.getElementById("message-container").style.background = "var(--twitch)";
	let temp = pool[Math.floor(Math.random() * pool.length)];	// check dupes

	while (temp == promptAll) {
		temp = pool[Math.floor(Math.random() * pool.length)];
	}

 	promptAll = temp; // checks dupes next iteration

 	if (temp.includes(";")) {
 		prompt = temp.slice(0, temp.indexOf(";"));
 		promptAlts = temp.slice(temp.indexOf(";") + 1, temp.length).split(";");
 	} else {
 		prompt = temp;
 		promptAlts = [];
 	}
	
	localStorage.prompt = prompt;

	let params = `scrollbars=no, resizable=no, status=no, location=no,
		toolbar=no, menubar=no, width=600, height=400, status=no`;

	promptWindow = window.open('prompt window.html', "Prompt Window", params);
}

function resetGame() {
	stopTimer();
	clearCanvas();
}