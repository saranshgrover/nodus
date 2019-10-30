import React from 'react';
import logo from './logo.svg';
import './App.css';
import Comp from './Comp'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Comp />
      </header>
    </div>
  );
}

export default App;
