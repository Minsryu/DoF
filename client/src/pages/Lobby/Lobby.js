import React, { Component } from "react";

import { Link } from "react-router-dom";

import WaitingRoom from "../../components/WaitingRoom";


class Lobby extends Component {
  state = {
  };

  render() {
    return (
      <div>
        <br/>
        <br/>
        <WaitingRoom />
      </div>
    );
  }
}

export default Lobby;
