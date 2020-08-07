function showPrompt() { //occurrs when prompt visibility button is pressed
	if (sessionStorage.getItem("visible prompt") === "1") {
		document.getElementById("prompt-container").innerHTML = "? ? ?";
		document.getElementById("show-prompt-button").innerHTML = "Show Prompt";
		sessionStorage.setItem("visible prompt", "0");
	} else {
		document.getElementById("prompt-container").innerHTML = sessionStorage.getItem('prompt');
		document.getElementById("show-prompt-button").innerHTML = "Hide Prompt";
		sessionStorage.setItem("visible prompt", "1");
	}
}

if (sessionStorage.getItem("visible prompt") === "1") {
	document.getElementById("prompt-container").innerHTML = sessionStorage.getItem('prompt');
	document.getElementById("show-prompt-button").innerHTML = "Hide Prompt";
} else {
	document.getElementById("prompt-container").innerHTML = "? ? ?";
	document.getElementById("show-prompt-button").innerHTML = "Show Prompt";
}