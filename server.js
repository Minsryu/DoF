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
    socket.join(room);
    
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
    
      if(Object.keys(gameList).length==2){

        var newroom = Object.keys(gameList)[0]+Object.keys(gameList)[1];
        console.log(newroom);
        io.to('game').emit('newroom',newroom);
      }
    }

    io.emit('test','Nav: this is working')
  })

  socket.on('switch room', (newroom)=>{

    var oldroom = socket.room;
    socket.leave(oldroom);
    socket.join(newroom);
    socket.room = newroom;
    console.log(socket.name+" switched room to "+socket.room)
    delete gameList[socket.name];

  })

  socket.on('send choice', function( player, choice){
    console.log(player);
    console.log(choice);
    console.log(socket.room);
    io.to(socket.room).emit('update choice',player,choice);
  })



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

    console.log('a user disconnected');
  });

});

http.listen(PORT, function(){
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});
