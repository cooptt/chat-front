import React, { Component } from 'react';
import './App.css';
import Chat from './components/Chat/Chat'
class App extends Component {

  // props.destId, only if the message is from USER-PROFILE
  render() {
    return (
      <Chat userId='0' destId='2'/>
    );
  }
}

export default App;
