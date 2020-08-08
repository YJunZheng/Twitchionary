if (localStorage.promptVisibility == "true") {
	document.getElementById("prompt-container").innerHTML = localStorage.prompt;
	document.getElementById("show-prompt-button").innerHTML = "Hide Prompt";
} else {
	document.getElementById("prompt-container").innerHTML = "? ? ?";
	document.getElementById("show-prompt-button").innerHTML = "Show Prompt";
}


function showPrompt() { //occurrs when prompt visibility button is pressed
	if (localStorage.promptVisibility == "true") {
		document.getElementById("prompt-container").innerHTML = "? ? ?";
		document.getElementById("show-prompt-button").innerHTML = "Show Prompt";
		localStorage.promptVisibility = "false";
	} else {
		document.getElementById("prompt-container").innerHTML = localStorage.prompt;
		document.getElementById("show-prompt-button").innerHTML = "Hide Prompt";
		localStorage.promptVisibility = "true";
	}
}