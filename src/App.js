import React, { Component } from 'react';
import Form from './Form';

import logo from './res/mushroom.png';
import bg from './res/bg2.jpg';
import './App.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { Typography } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: deepOrange
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: orange[400]
      }
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" style={{ zIndex: 2 }} alt="logo" />
            <img src={bg} className="App-bg" alt="bg" />
            <Typography
              color="primary" variant="h1"
              style={{ zIndex: 3, fontSize: '1em', fontWeight: 550, textShadow: 'black 0px 0.1em 0.3em' }}>
              3MLE to MS2MML converter
            </Typography>
          </header>
          <Form className="App-form" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
