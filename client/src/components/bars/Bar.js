import React, { Component } from "react";
import "./Bar.css";

class BalanceBar extends React.Component {

  constructor() {
    super();
    // debugger;
    this.state = {
      charge: 0,
      chargeUsed: 0,
      charged: 0,
    };

    this.setCharge = this.setCharge.bind(this);
  }

  setCharge(amount) {
    this.setState({chargeUsed: amount});
  }

  render() {

    let bal = (this.state.charge - this.state.chargeUsed - this.state.charged)
    let chargeUsedPercent = (this.state.chargeUsed / this.state.charge * 100);
    let chargedPercent = (this.state.charged / this.state.charge * 100);
    let balPercent = (100 - chargeUsedPercent - chargedPercent);

    return (
      <div>
        <div className='balanceBar'>
          <div className='balanceSection chargeUsed' style={{'width': chargeUsedPercent+'%'}}></div>
          <div className='balanceSection charged' style={{'width': chargedPercent+'%'}}></div>
          <div id='left' className='balanceSection left' style={{'width': balPercent+'%'}}><p>HP:{bal}</p></div>
        </div>
        <a href='#' onClick={this.setCharge.bind(this, 0)}>Set to 0</a>
        <br />
        <a href='#' onClick={this.setCharge.bind(this, 1)}>Set to 1</a>
        <br />
        <a href='#' onClick={this.setCharge.bind(this, 2)}>Set to 2</a>
        <br />
        <a href='#' onClick={this.setCharge.bind(this, 3)}>Set to 3</a>
      </div>
    );
  }
}

export default Bar;
