var client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
	},
	channels: [""]
});

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
		document.getElementById("user-name").innerHTML = 
			tags['display-name'] + ": ";
		document.getElementById("user-message").innerHTML = message;	
	});
});