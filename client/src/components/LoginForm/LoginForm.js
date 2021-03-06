import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import randomToken from 'random-token';
import Validator from "validator";
import {socket} from "../../config/socket.js";
import "./LoginForm.css";

//validate
//send data to DB
// Route correctly after the check is succesful.
// Replace Alerts with DOM feedback


class LoginForm extends Component {

  state = {
    username: "",
    password: "",
    img: "",
    isAuthenticated: false
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

  // onChange = e => {
  // this.setState({
  //   data: { [e.target.name]: e.target.value }
  //   });
  // }

  onChange = event => {
    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  lobbyPush = () => {
    return(
    < Redirect push to="/lobby" />
    )
  };

  onSignUp = event => {
    event.preventDefault();
    console.log("The state of things:", this.state);
    let user = this.state;
    if (user.username === "" || user.password === ""){
      alert("Please enter a username and password");
    } else {
      axios.post("/newUser", user).then(results => {
        if (results.data.errmsg) {
          // TODO: THIS NEEDS TO BE A UI ELEMENT...
          console.log(results.data.errmsg);
          alert("Username is taken. Please choose another");
        } else if (!results.data.errmsg) {
          localStorage.clear();
          console.log(results);
          window.localStorage.setItem("id", results.data._id);
          window.localStorage.setItem("username", results.data.username);
          // window.locaStorage.setItem("img", results.data.img);
          window.location.href="/lobby";
        }
      }).catch(function(err){
        alert("An error occured!");
        console.log("An error occured", err);
      })
    }
  }

  // Needs to make axios.

  logAttempt = event => {
    event.preventDefault();
    // socket.emit('authentication', this.state);
    let user = this.state;
    if (this.state.username == "" || user.password == ""){
      alert("Please enter a username and password");
    } else {

    }
  }


  // onSubmit = () => {
  //   const errors = this.validate(this.data.state.data);
  //   this.setState({ errors });
  //   if (Object.keys(errors).length === 0) {
  //     this.props.submit(this.state.data);
  //   }
  // };
  // //
  // validate = (data) => {
  //   const errors = {};
  //   if(!Validator.isEmail(data.email)) errors.email = "Invalid E-mail";
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
      let data = this.state;
      if (window.location.pathname === "/") {
        return (
          <div>
            <div className="login">
              <input name="username" type="text" placesholder="Username" className="username"
                value={this.state.username}
                onChange={this.onChange} />
              <input name="password" type="password" placeholder="Password" className="password"
                value={this.state.password}
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
              <input name="username" type="text" placeholder="Username" className="username"
                value={this.state.username}
                onChange={this.onChange} />
              <input name="img" type="text" placeholder="Profile Image (link)" className="imgLink"
                value={this.state.img}
                onChange={this.onChange} />
              <input name="password" type="password" placeholder="Password" className="password"
                value={this.state.password}
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
