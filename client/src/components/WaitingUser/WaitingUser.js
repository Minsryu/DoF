import React, { Component } from "react";
import "./WaitingUser.css";
import {socket} from "../../config/socket.js";

// const socket = (window.location.href.indexOf("heroku")!==-1) ? window.io() : io.connect("http://localhost:3001");


class WaitingUser extends Component {
  
  state = {
    data : {
      Timmy:{
      "Username": "Timmy",
      "Wins": 35,
      "Id": "233223jkj2lj2j332lk2"
      }, 
      Ryu:{
      "Username": "Ryu",
      "Wins": 20,
      "Id": "2l3klk23ljkj23432"
      }, 
      DoomBoi:{
      "Username": "DoomBoi",
      "Wins": 12,
      "Id": "2ol3jkfslkdjf203"
      }, 
      Agent47:{
      "Username": "Agent 47",
      "Wins": 4,
      "Id": "alsjfd2323"
      },
      Dom:{
      "Username": "Dom",
      "Wins": 8,
      "Id": "lasjdfo0293902"
      },
      Liz:
      {
      "Username": "Liz",
      "Wins": 45,
      "Id": "l141po4i3o329d02"
      }
    }
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

    socket.on('update lobby', (userList)=>{
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
  //
  // handleClick = (username, key) => {
  //   if (this.state.activeColumn === key) {
  //     let toggle = !this.state.toggle
  //     this.setState({
  //       toggle: toggle,
  //       activeColumn: key,
  //       rows: this.sortByColumn(this.state.data, username, toggle)
  //     })
  //   } else {
  //     this.setState({
  //       activeColumn: key,
  //       rows: this.sortByColumn(this.state.data, username, false)
  //     })
  //   }
  // }

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
                        <td
                          scope="row"
                          key={key}>
                          <button data-label={this.state.data[row][entry]}>Matcha</button>
                        </td>
                      )
                    }
                    else {
                      return (
                        <td
                          scope="row"
                          key={key}
                          data-label={entry}>
                          {this.state.data[row][entry]}
                        </td>
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
