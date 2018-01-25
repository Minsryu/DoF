import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";


class Login extends Component {

  submit = data => {
    console.log(data);
  };

  render() {
    return (
      <div>
         <LoginForm submit={this.submit}/>
      </div>
    );
  }
}

export default Login;
