import React, { Component } from 'react';
import Body from './Body'
import logo from '../pictures/truck.svg';
import dash from '../pictures/dash.png'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={dash} className='dash' alt="logo-dash"/>
          <h1 className="App-title">Welcome to Boltapp</h1>
        </header>
        <div className="Body">
          <Body />
        </div>
      </div>
    );
  }
}

export default App;
