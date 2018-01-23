import React, { Component } from "react";
import "./WaitingUser.css";


class WaitingUser extends Component {
  state = {
    data : [{
      "Username": "Timmy",
      "Wins": 35,
      "Id": "233223jkj2lj2j332lk2"
    }, {
      "Username": "Ryu",
      "Wins": 20,
      "Id": "2l3klk23ljkj23432"
    }, {
      "Username": "DoomBoi",
      "Wins": 12,
      "Id": "2ol3jkfslkdjf203"
    }, {
      "Username": "Agent 47",
      "Wins": 4,
      "Id": "alsjfd2323"
    },{
      "Username": "Dom",
      "Wins": 8,
      "Id": "lasjdfo0293902"
    },
    {
      "Username": "Liz",
      "Wins": 45,
      "Id": "l141po4i3o329d02"
    }]
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
            {this.state.data.map(function(row, key) {
              return (
                <tr key={key}>
                  {Object.keys(row).map(function(entry, key) {
                    if (entry === "Id") {
                      return (
                        <td
                          scope="row"
                          key={key}>
                          <button data-label={entry}>Matcha</button>
                        </td>
                      )
                    }
                    else {
                      return (
                        <td
                          scope="row"
                          key={key}
                          data-label={entry}>
                          {row[entry]}
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
