import React, { Component } from 'react';
import Form from './Form';
import Synthesiser from './Synthesiser';

import logo from './mushroom.png';
import bg from './bg2.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" style={{ zIndex: 2 }} alt="logo" />
          <img src={bg} className="App-bg" alt="bg" />
          <h1 style={{ zIndex: 3 }}>3MLE to MS2MML converter</h1>
        </header>
        <Form className="App-form" />
        <Synthesiser />
      </div>
    );
  }
}

export default App;
