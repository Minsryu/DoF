import React, { Component } from "react";
import axios from "axios";
import randomToken from 'random-token';
import validator from "validator";
import io from 'socket.io-client'
import "./LoginForm.css";


// Hook up input forms to whatever is sending user/pass to DB for check

// Route correctly after the check is succesful.


// Replace Alerts with DOM feedback

const socket = window.io();

class LoginForm extends Component {

  state = {
    data: {
        username: "",
        password: "",
        img: "",
        isAuthenticated: false
      },
    loading: false,
    errors: {}
  }

  componentDidMount(){

    socket.on('connect', () => {
      console.log('connected!');

      socket.on('authenticated', () => {
        console.log('You logged in...');
        this.setState({
          isAuthenticated: true
        })
          //Use the socket as usual!?
      });

      socket.on('unauthorized', function(err){
        //TODO: MAKE THIS DO DOM STUFF!
        console.log('YOU FAILED. YOU ARE WRONG. THE GATES ARE CLOSED TO YOU SIR,', err.message);
      });

    });
  }

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value } });

 //NOTE: added data to this.data.state
  onSignUp(event){
    event.preventDefault();
    console.log("Sign up button pressed");
    axios.post("/newUser", this.data.state).then(function(results){
      console.log("Results:", results);
      if (results.data.errmsg) {
        // TODO: THIS NEEDS TO BE A UI ELEMENT...
        alert("1. Username is taken. Please choose another");
      }
    }).catch(function(err){
      alert("2. Username is taken. Please choose another");
      console.log("An error occured", err);
    })
  }

  // Needs to make axios.

  logAttempt(event){
    event.preventDefault();
    socket.emit('authentication', this.data.state);
  }

  onSubmit = () => {
    const errors = this.validate(this.data.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    })
  };
  //
  // validate = (data) => {
  //   const errors = {};
  //   // if(!Validator.isEmail(data.email)) errors.email = "Invalid E-mail";
  //   if(!data.password) errors.password = "Can't be blank";
  //   return errors;
  // }

  routing = () => {
    if (this.state.isAuthenticated === true){
      //Clear cookies
      //NEW Cookie needs to save username, img link, wins to cookie.
      // route to /lobby
    } else {
      // Clear forms
      // Tell user they are bad child.
    }
  };



  renderForm = () => {
      const data = this.state;
      if (window.location.pathname === "/") {
        return (
          <div>
            <div className="login">
              <input type="text" placesholder="Username" className="username"
                value={data.username}
                onChange={this.onChange} />
              <input type="password" placeholder="Password" className="password"
                value={data.password}
                onChange={this.onChange} />
              <a href="/signUp" className="forgot">sign up?</a>
              <input type="submit" value="Sign In" onClick={this.logAttempt}/>
            </div>
            <div className="shadow"></div>
          </div>
        );
      } else if (window.location.pathname === "/signUp") {
        return (
          <div>
            <div className="signUp">
              <input type="text" placeholder="Username" className="username"
                value={data.username}
                onChange={this.onChange} />
              <input type="text" placeholder="Profile Image (link)" className="imgLink"
                value={data.img}
                onChange={this.onChange} />
              <input type="password" placeholder="Password" className="password"
                value={data.password}
                onChange={this.onChange} />
              <a href="/" className="forgot">Already have an account?</a>
              <input type="submit" value="SignUp" onClick={this.onSignUp}/>
            </div>
            <div className="shadow"></div>
          </div>
        );
      }
    }

  render() {

    return (

      <div>
        {this.renderForm()}
      </div>

      );
    }
}


// deleted from line 100 ''.bind(this)''

export default LoginForm;
