var promptWindow;
var pool = getPool();
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
	document.getElementById("message-container").style.background = "var(--twitch)";
	let temp = pool[Math.floor(Math.random() * pool.length)]	// check dupes

	while (temp == prompt) {
		temp = pool[Math.floor(Math.random() * pool.length)]
	}
 
	prompt = temp;
	localStorage.prompt = prompt;

	let params = `scrollbars=no, resizable=no, status=no, location=no,
		toolbar=no, menubar=no, width=600, height=400, status=no`;

	promptWindow = window.open('prompt window.html', "Prompt Window", params);
}