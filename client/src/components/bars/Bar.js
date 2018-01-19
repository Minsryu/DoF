import React, { Component } from "react";
import "./Bar.css";

class BalanceBar extends React.Component {

  constructor() {
    super();
    // debugger;
    this.state = {
      health: 3,
      damageTaken: 0,
      damage: 0,
    };

    this.setHealth = this.setHealth.bind(this);
  }

  setHealth(amount) {
    this.setState({damageTaken: amount});
  }

  render() {

    let bal = (this.state.health - this.state.damageTaken - this.state.damage)
    let damageTakenPercent = (this.state.damageTaken / this.state.health * 100);
    let damagePercent = (this.state.damage / this.state.health * 100);
    let balPercent = (100 - damageTakenPercent - damagePercent);

    return (
      <div>
        <div className='balanceBar'>
          <div className='balanceSection damageTaken' style={{'width': damageTakenPercent+'%'}}></div>
          <div className='balanceSection damage' style={{'width': damagePercent+'%'}}></div>
          <div id='left' className='balanceSection left' style={{'width': balPercent+'%'}}><p>HP:{bal}</p></div>
        </div>
        <a href='#' onClick={this.setHealth.bind(this, 0)}>Set to 0</a>
        <br />
        <a href='#' onClick={this.setHealth.bind(this, 1)}>Set to 1</a>
        <br />
        <a href='#' onClick={this.setHealth.bind(this, 2)}>Set to 2</a>
        <br />
        <a href='#' onClick={this.setHealth.bind(this, 3)}>Set to 3</a>
      </div>
    );
  }
}

export default Bar;
