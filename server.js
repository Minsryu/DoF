const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.listen(PORT, function() {
//   console.log(`🌎 ==> Server now on port ${PORT}!`);
// });

io.on('connection', function(socket){

  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    // console.log('message: ' + msg);
    io.emit('chat message', msg)
  });

});

http.listen(PORT, function(){
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});
