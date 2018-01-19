import React, { Component } from "react";
import "./playerOne.css";
import "../effects.css"
import shield from '../../shield.svg';
import charge from '../../refresh-button.svg';
import shoot from '../../shoot.svg';
import ult from '../../diamond.svg';


class playerOne extends Component {

  state = {
    health: 3,
    damageTaken: 0,
    damage: 0
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
  <div className="p1-user-profile">
  	<img className="avatar" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTF_erFD1SeUnxEpvFjzBCCDxLvf-wlh9ZuPMqi02qGnyyBtPWdE-3KoH3s" alt="Ash" />
      <div className="username">Will Smith</div>
    <div className="bio">
    	Wins: 10
    </div>
    <div className="actions">
        <img src={charge} className="icon charge" alt="charge" />
        <img src={shield} className="icon shield" alt="shield" />
        <img src={shoot} className="icon shoot" alt="shoot" />
        <img src={ult} className="icon ult" alt="ult" />
    </div>
    <div>
      <div className='balanceBar'>
        <div className='balanceSection damageTaken' style={{'width': damageTakenPercent+'%'}}></div>
        <div className='balanceSection damage' style={{'width': damagePercent+'%'}}></div>
        <div id='left' className='balanceSection left' style={{'width': balPercent+'%'}}>{bal}</div>
      </div>
    </div>
    {/* <ul className="data">
      <li>
        <span className="entypo-heart">HP: 3</span>
      </li>
      <li>
        <span className="entypo-eye">Charge: 0</span>
      </li>
    </ul> */}
  </div>
    );
  }
}

export default playerOne;


// {props.state}

// HOW TO SET THINGS
{/* <a href='#' onClick={this.setHealth.bind(this, 0)}>Set to 0</a>
<br />
<a href='#' onClick={this.setHealth.bind(this, 1)}>Set to 1</a>
<br />
<a href='#' onClick={this.setHealth.bind(this, 2)}>Set to 2</a>
<br />
<a href='#' onClick={this.setHealth.bind(this, 3)}>Set to 3</a> */}
