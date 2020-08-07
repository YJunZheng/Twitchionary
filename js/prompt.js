$(document).ready(function() {
	var prompt = "";
	var promptWindow;
	localStorage.promptVisibility = "false";
})

function updatePromptPool(id) {
	promptPool[id][0] = document.getElementById(id).checked;
}

function getPool() {
	let pool = [];

	for (var i in promptPool) {
		if (promptPool.hasOwnProperty(i)) {
			if (promptPool[i][0]) {
				pool = pool.concat(promptPool[i][1]);
			}
		}
	}

	return pool;
}

function promptPopup() { //occurrs when new prompt button is pressed
	let pool = getPool();
	prompt = pool[Math.floor(Math.random() * pool.length)];
	localStorage.prompt = prompt;

	let params = `scrollbars=no, resizable=no, status=no, location=no,
		toolbar=no, menubar=no, width=600, height=400, status=no`;

	promptWindow = window.open('prompt window.html', "Prompt Window", params);
}