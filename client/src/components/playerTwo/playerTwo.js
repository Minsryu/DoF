import React from "react";
import "./playerTwo.css";
import "../effects.css"
import shield from '../../shield.svg';
import charge from '../../refresh-button.svg';
import shoot from '../../shoot.svg';
import ult from '../../diamond.svg';


const playerTwo = props => (

  <div className="bigWrapTwo">
      <div className="p2healthWrap">
        <h3 className="p2healthState"> 3 </h3>
        <p>P2 Health</p>
      </div>
      <div className="p2chargeWrap">
        <h3 className="p2chargeState"> 0 </h3>
        <p>P2 Charge</p>
      </div>
  </div>
    );


export default playerTwo;


// {props.state}
