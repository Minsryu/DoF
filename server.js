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

var userList = {};
var gameList = {};

io.on('connection', function(socket){

  socket.on('enter room',function(room, newUser){

    var object = newUser[Object.keys(newUser)[0]]
    var name = object.Username + io.engine.clientsCount;
    console.log(name);
    socket.name = name;
    socket.room = room;
    
    if(room == "lobby"){
    userList[name] = object;
    console.log("lobby: ");
    console.log(userList);
    io.emit('update '+room,userList);
    }
    else if(room == "game"){
    gameList[name] = object;
    console.log("game: added");
    console.log(gameList);
    io.emit('update '+room,gameList);

    }

    io.emit('test','Nav: this is working')
  })

  socket.on('chat message', function(msg){
    // console.log('message: ' + msg);
    io.emit('chat message', msg)
  });

  console.log('a user connected');
  socket.on('disconnect', function(){

    if(socket.room == "lobby"){
    delete userList[socket.name];
    io.emit('update '+socket.room,userList);
    }
    else if(socket.room=="game"){

    delete gameList[socket.name];
    io.emit('update '+socket.room,userList);
    }
    
  });

});

http.listen(PORT, function(){
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});
