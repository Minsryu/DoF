import React, { Component } from "react";
import { Link } from "react-router-dom";
//Components
import Nav from "../../components/Nav";
import PlayerOne from "../../components/playerOne";
import PlayerTwo from "../../components/playerTwo";
//Styles
import "./Room.css";

class Room extends Component {

  state = {
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
