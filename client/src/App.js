import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const socket = window.io();
// let socket = io('http://localhost:3001');

class App extends Component {

  state = {
    message:"",
    chat: []
  }

  inputChange = event => {
    // Getting the value and name of the input which triggered the change

    // Updating the input's state
    this.setState({
      message: event.target.value
    });
  }

  componentDidMount(){
    socket.on('chat message',this.messageRecieve);
    console.log("this is working#1");
  }

  messageRecieve = msg =>{
    
    this.setState({chat:[...this.state.chat, msg ]});
    console.log(this.state.chat);
    console.log("is this working?")
  }

  sendMessage = event =>{
    event.preventDefault();
    console.log(this.state.message);
    socket.emit('chat message',this.state.message);
    this.setState({message:""});
  }


  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <ul id="messages">
          {this.state.chat.map(chat =>{
            return (<li key={chat}>{chat}</li>)
          })
          }
        </ul>
        <form action="">
          <input 
          id="m" 
          value = {this.state.message}
          autocomplete="off"
          onChange = {this.inputChange}
          // value = {this.state.message}
          />
          <button onClick={this.sendMessage}>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
