const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const randtoken = require("random-token");

const User = require("./models/userModel");


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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets -- TODO: Change to build for deploy?
// app.use(express.static("public"));

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/dualOfFate", {
		useMongoClient: true
	});

// singUp -- newUser
  app.post("/newUser", function(req, res){
    User.create(req.body)
      .then(function(dbUser){
        console.log("Added", JSON.stringify(dbUser));
        res.json(dbUser);
    })
    .catch(function(err){
      console.log("error", JSON.stringify(err));
      res.json(err);
    });
  });





let userList = {};
let gameList = {};

  // require('socketio-auth')(io, {
  //
  //   authenticate: function(socket, data, callback){
  //
  //     let username = data.username;
  //     let password = data.password;
  //
  //     User.findOne({username: data.username,
  //                    password: data.password},
  //                  function(err, user) {
  //                    if (err || !user) {
  //                      console.log("No match found...");
  //                      return callback(new Error("User not found"));
  //                    }
  //                      return callback(null, user.password == password);
  //                  });
  //     },
  //
  //     timeout:500000000,
  //
  //     postAuthenticate(socket, data) {
  //       console.log(data)
  //     }
  // });

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
    console.log(socket.room);
    io.to('lobby').emit('updatelobby' , userList);
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

  // require('socketio-auth')(io, {

  //   authenticate: function(socket, data, callback){

  //     let username = data.username;
  //     let password = data.password;

  //     User.findOne({username: data.username,
  //                    password: data.password},
  //                  function(err, user) {
  //                    if (err || !user) {
  //                      console.log("No match found...");
  //                      return callback(new Error("User not found"));
  //                    }
  //                      return callback(null, user.password == password);
  //                  });
  //     },

  //     timeout:500000000,

  //     postAuthenticate(socket, data) {
  //       console.log(data)
  //     }
  // });

http.listen(PORT, function(){
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});
