var io = require("socket.io-client");

class Socket {
	constructor() {
		// connect to server
		this.socket = (window.location.href.indexOf("heroku")!==-1) ? io(window.location.origin); : io.connect("http://localhost:3001");
	}
}

// export single instance of socket
export let socket = new Socket().socket;