import React, { Component } from "react";
import "./playerTwo.css";
import "../effects.css"
import shield from '../../svg/shield.svg';
import charge from '../../svg/refresh-button.svg';
import shoot from '../../svg/p2shoot.svg';
import ult from '../../svg/diamond.svg';

class playerTwo extends Component {

  state = {
  
  }

  /* p2 HP */
  setP2_health(amount) {
    this.setState({p2_damageTaken: amount});
  }
  /* p2 Charge */
  setCharge(amount) {
    this.setState({p2_chargeUsed: amount});
  }


  render() {
        // HP logic
        let p2_bal = (this.props.playerTwo.health - this.props.playerTwo.damageTaken - this.props.playerTwo.damage)
        let p2_damageTakenPercent = (this.props.playerTwo.damageTaken / this.props.playerTwo.health * 100);
        let p2_damagePercent = (this.props.playerTwo.damage / this.props.playerTwo.health * 100);
        let p2_balPercent = (100 - p2_damageTakenPercent - p2_damagePercent);

        // Pcharge logic
        let p2_currentCharge = (this.props.playerTwo.chargeUsed)
        let p2_chargeUsedPercent = (this.props.playerTwo.chargeUsed / this.props.playerTwo.Charge * 100);
        let p2_chargedPercent = (this.props.playerTwo.charged / this.props.playerTwo.Charge * 100);
        let p2_currentChargePercent = (100 - p2_chargeUsedPercent - p2_chargedPercent);

  return (
  <div className="positonFix">
    <div className="p2-user-profile">
    	<img className="avatar" src="https://3.bp.blogspot.com/-gzobaywdwXI/WK3wPcTv1LI/AAAAAAABB7s/1hkXL6lIoQI78NG-s4OlGc6LSIBGoBvqQCLcB/s200/56f1b6c9db77eb6a.jpg" alt="User_Two" />
        <div className="username">Sonny</div>
      <div className="bio">
      	Wins: 3
      </div>
      <p className= 'barText'> Health: {p2_bal}</p>
      <div>
        <div className='p2_balanceBar'>
          <div className='p2_balanceSection p2_damageTaken' style={{'width': p2_damageTakenPercent+'%'}}></div>
          <div className='p2_balanceSection p2_damage' style={{'width': p2_damagePercent+'%'}}></div>
          <div id='left' className='p2_balanceSection left' style={{'width': p2_balPercent+'%'}}></div>
        </div>
      </div>
      <p className= 'barText'>Charge: {p2_currentCharge} / 3</p>
      {/* Pcharge */}
      <div>
        <div className='p2_currentChargeBar'>
          <div className='p2_currentChargeSection p2_chargeUsed' style={{'width': p2_chargeUsedPercent+'%'}}></div>
          <div className='p2_currentChargeSection p2_charged' style={{'width': p2_chargedPercent+'%'}}></div>
          <div id='left' className='p2_currentChargeSection right' style={{'width': p2_currentChargePercent+'%'}}></div>
        </div>
      </div>
      {/* Actions */}
      <div className="actions">
        <img src={shoot} onClick = {(e)=>{this.props.sendChoice(e,"playerTwo")}} className="icon p2_shoot" alt="shoot" />
        <img src={shield} onClick = {(e)=>{this.props.sendChoice(e,"playerTwo")}} className="icon shield" alt="shield" />
        <img src={charge} onClick = {(e)=>{this.props.sendChoice(e,"playerTwo")}} className="icon charge" alt="charge" />
        <img src={ult} onClick = {(e)=>{this.props.sendChoice(e,"playerTwo")}} className="icon ult" alt="ult" />
      </div>
    </div>
  </div>
    );
  }
}

export default playerTwo;
