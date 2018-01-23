import React, { Component } from "react";
import "./WaitingRoom.css";
import Table from "../WaitingUser";


class WaitingRoom extends Component {


  render() {
    return (
      <div>
        <h1>Lobby</h1>
        <Table />
      </div>
    );
  }
}

export default WaitingRoom;
