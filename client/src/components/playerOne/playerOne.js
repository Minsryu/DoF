import React, { Component } from "react";
import "./playerOne.css";
import "../effects.css"
import shield from '../../svg/shield.svg';
import pCharge from '../../svg/refresh-button.svg';
import shoot from '../../svg/shoot.svg';
import ult from '../../svg/diamond.svg';

//NOTES
// pCharge / Pcharge is Potential Charge...
// The LESS potential charge, the more usable moves.
// So ult should be usable at pCharge == 0, Shoot at pCharge == 3 | 2 | 1...


/*
      HEALTH
<a href='#' onClick={this.setHealth.bind(this, 0)}>Set to 0</a>
<br />
<a href='#' onClick={this.setHealth.bind(this, 1)}>Set to 1</a>
<br />
<a href='#' onClick={this.setHealth.bind(this, 2)}>Set to 2</a>
<br />
<a href='#' onClick={this.setHealth.bind(this, 3)}>Set to 3</a>
      CHARGE
<a href='#' onClick={this.setCharge.bind(this, 0)}>Set to 0</a>
<br />
<a href='#' onClick={this.setCharge.bind(this, 1)}>Set to 1</a>
<br />
<a href='#' onClick={this.setCharge.bind(this, 2)}>Set to 2</a>
<br />
<a href='#' onClick={this.setCharge.bind(this, 3)}>Set to 3</a> */


class playerOne extends Component {
 

  state = {
    
  }

  /* p1 HP */
  setHealth(amount) {

    this.setState({damageTaken: amount});
  }

  setCharge(amount) {
    this.setState({chargeUsed: amount});
  }

  render() {
        // HP logic
        let bal = (this.props.playerOne.health - this.props.playerOne.damageTaken - this.props.playerOne.damage)
        let damageTakenPercent = (this.props.playerOne.damageTaken / this.props.playerOne.health * 100);
        let damagePercent = (this.props.playerOne.damage / this.props.playerOne.health * 100);
        let balPercent = (100 - damageTakenPercent - damagePercent);

        // Pcharge logic
        let currentCharge = (this.props.playerOne.chargeUsed)
        let chargeUsedPercent = (this.props.playerOne.chargeUsed / this.props.playerOne.pCharge * 100);
        let chargedPercent = (this.props.playerOne.charged / this.props.playerOne.pCharge * 100);
        let currentChargePercent = (100 - chargeUsedPercent - chargedPercent);

  return (
  <div className="p1-user-profile">
  	<img className="avatar" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTF_erFD1SeUnxEpvFjzBCCDxLvf-wlh9ZuPMqi02qGnyyBtPWdE-3KoH3s" alt="Ash" />
      <div className="username">Will Smith</div>
    <div className="bio">
    	Wins: 10
    </div>
    <p className= 'barText'> Health: {bal}</p>
    <div>
      <div className='balanceBar'>
        <div className='balanceSection damageTaken' style={{'width': damageTakenPercent+'%'}}></div>
        <div className='balanceSection damage' style={{'width': damagePercent+'%'}}></div>
        <div id='left' className='balanceSection left' style={{'width': balPercent+'%'}}></div>
      </div>
    </div>
    <p className= 'barText'>Charge: {currentCharge} / 3</p>
    {/* Pcharge */}
    <div>
      <div className='currentChargeBar'>
        <div className='currentChargeSection chargeUsed' style={{'width': chargeUsedPercent+'%'}}></div>
        <div className='currentChargeSection charged' style={{'width': chargedPercent+'%'}}></div>
        <div id='left' className='currentChargeSection right' style={{'width': currentChargePercent+'%'}}></div>
      </div>
    </div>
    {/* Actions */}
    <div className="actions">
        <img src={ult} onClick = {(e)=>{this.props.sendChoice(e,"playerOne")}} className="icon ult" alt="ult" />
        <img src={pCharge} onClick = {(e)=>{this.props.sendChoice(e,"playerOne")}} className="icon charge" alt="charge" />
        <img src={shield} onClick = {(e)=>{this.props.sendChoice(e,"playerOne")}} className="icon shield" alt="shield" />
        <img src={shoot} onClick = {(e)=>{this.props.sendChoice(e,"playerOne")}} className="icon shoot" alt="shoot" />
    </div>
    {/* HP */}
  </div>
    );
  }
}

export default playerOne;
