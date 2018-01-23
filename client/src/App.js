import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
// uncomment this before merge....
// import io from 'socket.io-client';

// Import Pages
import Lobby from "./pages/Lobby";
import Login from "./pages/Login";
import Room from "./pages/Room";
import NoMatch from "./pages/NoMatch";
// Import that NAV BBY.
import Nav from "./components/Nav";

const socket = window.io();
// let socket = io('http://localhost:3001');

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/room" component={Room} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
