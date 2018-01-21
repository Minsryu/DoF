import React, { Component } from "react";
import "./playerTwo.css";
import "../effects.css"
import shield from '../../shield.svg';
import charge from '../../refresh-button.svg';
import shoot from '../../shoot.svg';
import ult from '../../diamond.svg';

class playerTwo extends Component {

  state = {
    p2_health: 3,
    p2_damageTaken: 0,
    p2_damage: 0,
    p2Charge: 3,
    p2_chargeUsed: 0,
    p2_charged: 0
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
        let p2_bal = (this.state.p2_health - this.state.p2_damageTaken - this.state.p2_damage)
        let p2_damageTakenPercent = (this.state.p2_damageTaken / this.state.p2_health * 100);
        let p2_damagePercent = (this.state.p2_damage / this.state.p2_health * 100);
        let p2_balPercent = (100 - p2_damageTakenPercent - p2_damagePercent);

        // Pcharge logic
        let p2_currentCharge = (this.state.p2_chargeUsed)
        let p2_chargeUsedPercent = (this.state.p2_chargeUsed / this.state.p2Charge * 100);
        let p2_chargedPercent = (this.state.p2_charged / this.state.p2Charge * 100);
        let p2_currentChargePercent = (100 - p2_chargeUsedPercent - p2_chargedPercent);

  return (
  <div className="positonFix">
    <div className="p2-user-profile">
    	<img className="avatar" src="https://i.imgur.com/TBDjThU.png" alt="User_Two" />
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
        <img src={shoot} className="icon shoot" alt="shoot" />
        <img src={shield} className="icon shield" alt="shield" />
        <img src={charge} className="icon charge" alt="charge" />
        <img src={ult} className="icon ult" alt="ult" />
      </div>
    </div>
  </div>
    );
  }
}

export default playerTwo;
