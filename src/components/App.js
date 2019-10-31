import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Comp from './Comp'
import {signIn} from '../server/auth'
import {getWcif} from '../server/wca-api'
export default class App extends Component {
  render() {
    console.log(getWcif())
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Comp signIn={signIn} />
        </header>
      </div>
    );
  }
}