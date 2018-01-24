import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";


class Login extends Component {

  render() {
    return (
      <div>
         <LoginForm />
      </div>
    );
  }
}

export default Login;
