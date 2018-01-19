import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const socket = window.io();
// let socket = io('http://localhost:3001');

class App extends Component {

  state = {
    message:"",
    chat: [],
    player1:"",
    player2:"",
    result:"Pending Choices"
  }

  choice = {
    player1: "",
    player2: ""
  }

  componentDidMount(){
    socket.on('chat message',this.messageRecieve);
  }

  checkAction () {

    var action1 = this.choice.player1;
    var action2 = this.choice.player2;
    console.log(action1);
    console.log(action2);

    console.log("#36: is this active?");
    if( action1 !=="" && action2!==""){

      if(action1 === action2){
        console.log("this matches");
        this.setState({
          result:"This Matches"
        });
        this.choice = {
          player1: "",
          player2: ""
        };
      }
      else{
        console.log("this does not match");
        this.setState({
          result:"This does not Match"
        })
        this.choice = {
          player1: "",
          player2: ""
        };
      }
      console.log("#39: both value changed");

    }
  }

  inputChange = event => {
    // Getting the value and name of the input which triggered the change
    var {name,value} = event.target;
    // Updating the input's state
    this.setState({
      [name]: value,
      message:value
    });
  }

  sendMessage = event =>{
    event.preventDefault();
    socket.emit('chat message',this.state.message);
    console.log(this.state.message);

    var {name} = event.target;

    this.choice[event.target.getAttribute("name")] = this.state.message;

    this.setState({
      message:"",
      [name]:""
    });
    this.checkAction();
    
  }

  messageRecieve = msg =>{
    
    this.setState({chat:[...this.state.chat, {msg:msg,key:Date.now()} ]});
    console.log(this.state.chat);
    console.log("is this working?")
  }

  render() {

    return (
      <div>
        <p>{this.state.message}</p>
        <p>{this.state.result}</p>
        <ul id="messages">
          {this.state.chat.map(chat =>{
            return (<li key={chat.key}>{chat.msg}</li>)
          })
          }
        </ul>
        <form action="">
          <input 
          name="player1"
          id="m" 
          value = {this.state.player1}
          autoComplete="off"
          onChange = {this.inputChange}
          // value = {this.state.message}
          />
          <button 
          name="player1"
          onClick={this.sendMessage}>Send
          </button>
        </form>
        <form action="">
          <input 
          name="player2"
          id="m" 
          value = {this.state.player2}
          autoComplete="off"
          onChange = {this.inputChange}
          // value = {this.state.message}
          />
          <button 
          name="player2"
          onClick={this.sendMessage}>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
