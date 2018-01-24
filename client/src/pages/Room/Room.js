import React, { Component } from "react";
import { Link } from "react-router-dom";
//Components
import Nav from "../../components/Nav";
import PlayerOne from "../../components/playerOne";
import PlayerTwo from "../../components/playerTwo";
//Styles
import "./Room.css";
import {socket} from "../../config/socket.js";

class Room extends Component {

  state = {
  }

  componentDidMount(){



    socket.on('connect',()=>{

      console.log("you have been connected");
      socket.emit('enter room','game',{Timmy:
        {
        "Username":"Timmy",
        "Wins":35,
        "Id":"233223jkj2lj2j332lk2"
        }
      })
    })

    socket.on('update game', (userList)=>{
      this.setState({data:userList});
      console.log(userList);
    })

  }


  render() {
    return (
      <div className="Room">
        <PlayerOne />
        <PlayerTwo />
      </div>
    );
  }
}

export default Room;
