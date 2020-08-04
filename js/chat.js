const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
	},
	channels: ["mizkif"]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	console.log(`${tags['display-name']}: ${message}`);
});