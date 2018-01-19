import React from "react";
import "./Nav.css";

const Nav = props => (
  <div className="navWrap">
  <h1 className="nav">{props.children}</h1>
  <button className="navButton blue" onClick={() => props.clickReset()}>UUHHHHH</button>
  <button className="navButton login" onClick={() => props.clickLogin()}>Login</button>
  <button className="navButton match" onClick={() => props.clickFindGame()}>Find Game</button>
  </div>
);

export default Nav;
