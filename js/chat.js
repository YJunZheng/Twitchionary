var client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
	},
	channels: [""]
});

const winAudio = new Audio("assets/audio/win.mp3");
const loseAudio =  new Audio("assets/audio/lose.mp3");
var paused = false;
var prompt = "";	 // main prompt
var promptAlts = []; // array of accepted alternatives of the prompt
client.connect();

function winGame() {
	stopTimer();
	document.getElementById("message-container").style.background = "var(--light-twitch)";
	winAudio.play();
}

client.on('message', (channel, tags, message, self) => {
	document.getElementById("user-name").innerHTML = 
		tags['display-name'] + ": ";
	document.getElementById("user-message").innerHTML = message;
});

jQuery("#channel-textfield").on("input propertychange paste", function() {
	client.disconnect();

    client = new tmi.Client({
		connection: {
			secure: true,
			reconnect: true
		},
		channels: [document.getElementById("channel-textfield").value]
	});

	client.connect();

	client.on('message', (channel, tags, message, self) => {
		if (paused != true) {
			if (message.toUpperCase() == prompt.toUpperCase()) {	// if someone wins
				winGame();
			}

			for (i = 0; i < promptAlts.length; i++) {
				if (message.toUpperCase() == promptAlts[i].toUpperCase()) {
					winGame();
				}
			}
			
			document.getElementById("user-name").innerHTML = 
				tags['display-name'] + ": ";
			document.getElementById("user-message").innerHTML = message;
		}	
	});
});