import React, { Component } from "react";
import { Link } from "react-router-dom";
//Componentsf
import Nav from "../../components/Nav";
import PlayerOne from "../../components/playerOne";
import PlayerTwo from "../../components/playerTwo";
//Styles
import "./Room.css";
import {socket} from "../../config/socket.js";

class Room extends Component {

  state = {

    mesaage:"",
    player1:"pending",
    player2:"pending",
    result:"pending",
    playerOne:{
      choice:"",
      health: 3,
      damageTaken: 0,
      damage: 0,
      pCharge: 3,
      chargeUsed: 0,
      charged: 0
    },
    playerTwo:{
      choice:"",
      health: 3,
      damageTaken: 0,
      damage: 0,
      Charge: 3,
      chargeUsed: 0,
      charged: 0
    }
  }

  componentDidMount(){

    socket.on('connect',()=>{

      console.log("you have been connected");
      socket.emit('enter room','game',{Timmy:
        {
        "Username":"Timmy",
        "Wins":35,
        "Id":"233223jkj2lj2j332lk2"
        }
      })
    })

    socket.on('newroom', (newroom)=>{

      socket.emit('switch room', newroom);

    })

    socket.on('update choice',(player,choice)=>{

      this.setState({
        [player]: Object.assign({}, this.state[player], {
          choice: choice
         })
        });

      if(this.state.playerOne.choice !=="" && this.state.playerTwo.choice !==""){

        //run check function
        console.log("both took action");
        this.checkAction('playerOne');
        // this.checkAction('playerTwo');
      }


    })

    socket.on('update game', (userList)=>{
      this.setState({data:userList});
      console.log(userList);
    })

  }

  checkAction = (player)=>{
    console.log("checkAction");
    console.log(this.state[player].choice);
    switch(this.state[player].choice){
      case "charge":
        console.log("case active!!")

        this.setState({
          [player]: Object.assign(
            {},
            this.state[player],
            {
              charge: this.state[player].charge + 1
            })
        })
        break;
    }
    console.log(this.state[player].choice);
  }

  sendChoice = (event,player) =>{
    var choice = event.target.getAttribute("alt");
    socket.emit('send choice',player,choice);
  }


  render() {
    return (
      <div className="Room">
        <PlayerOne playerOne = {this.state.playerOne} sendChoice={this.sendChoice}/>
        <h2>Result: {this.state.result}</h2>
        <h2>Player1 choice: {this.state.playerOne.choice}</h2>
        <h2>Player2 choice: {this.state.playerTwo.choice}</h2>
        <PlayerTwo playerTwo = {this.state.playerTwo} sendChoice={this.sendChoice}/>
      </div>
    );
  }
}

export default Room;
