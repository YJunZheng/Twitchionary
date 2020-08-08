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
var prompt = "";
client.connect();

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
			if (message.toUpperCase() == prompt.toUpperCase()) {
				document.getElementById("message-container").style.background = "var(--light-twitch)";
				winAudio.play();
				paused = true;
			}
			document.getElementById("user-name").innerHTML = 
				tags['display-name'] + ": ";
			document.getElementById("user-message").innerHTML = message;
		}	
	});
});