import React, { Component } from "react";
import "./WaitingUser.css";
import {socket} from "../../config/socket.js";

// const socket = (window.location.href.indexOf("heroku")!==-1) ? window.io() : io.connect("http://localhost:3001");


class WaitingUser extends Component {

  state = {
    data:""
  }

  componentDidMount(){



    socket.on('connect',()=>{

      console.log("you have been connected");
      socket.emit('enter room','lobby',{Timmy:
        {
        "Username":"Timmy",
        "Wins":35,
        "Id":"233223jkj2lj2j332lk2"
        }
      })
    })

    socket.on('updatelobby', (userList)=>{
      console.log("this triggered")
      this.setState({data:userList});
      console.log(userList);
    })

  }




  getInitialState = () => {
    return {
      data: this.state.data,
      toggle: false,
      activeColumn: 0,
      lastActiveColumn: 0,
    }
  }

  render() {
    return (
        <table className="responsive-table">
          <thead>
            <tr>
                <th>Username</th>
                <th>Wins</th>
                <th>Click to Match</th>
            </tr>
          </thead>
          <tbody>

            {Object.keys(this.state.data).map((row, key)=> {
              return (
                <tr key={key}>

                  {Object.keys(this.state.data[row]).map((entry, key)=> {
                    if (entry === "Id") {
                      return (
                        <th
                          scope="row"
                          key={key}>

                          <button data-label={this.state.data[row][entry]}>Matcha</button>

                        </th>
                      )
                    }
                    else {
                      return (
                        <th
                          scope="row"
                          key={key}
                          data-label={entry}>
                          {this.state.data[row][entry]}
                        </th>
                      )
                    }

                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
    );
  }
}

export default WaitingUser;
