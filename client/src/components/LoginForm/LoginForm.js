import React, { Component } from "react";
import "./LoginForm.css";

class LoginForm extends Component {

  renderForm = () => {
      if (window.location.pathname === "/") {
        return (
          <div>
            <div class="login">
              <input type="text" placeholder="Username" className="username" />
              <input type="password" placeholder="Password" className="password" />
              <a href="/signUp" class="forgot">sign up?</a>
              <input type="submit" value="Sign In" />
            </div>
            <div class="shadow"></div>
          </div>
        );
      } else if (window.location.pathname === "/signUp") {
        return (
          <div>
            <div class="signUp">
              <input type="text" placeholder="Username" className="username" />
              <input type="text" placeholder="Profile Image (link)" className="imgLink" />
              <input type="password" placeholder="Password" className="password" />
              <a href="/" class="forgot">login</a>
              <input type="submit" value="SignUp" />
            </div>
            <div class="shadow"></div>
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

export default LoginForm;
