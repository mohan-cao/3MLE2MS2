import React, { Component } from 'react';
import Form from './Form';

import logo from './res/mushroom.png';
import bg from './res/bg2.jpg';
import './App.css';
import './SocialButton.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { Typography, Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

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
  constructor() {
    super()
    this.state = {
      flip: false
    }
  }
  render() {
    const { flip } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo}
              className={(flip) ? "App-logo flip" : "App-logo bob"} style={{ zIndex: 2 }}
              alt="logo"
              onClick={() => this.setState({ flip: true })}
              onAnimationEnd={() => this.setState({ flip: false })}
            />
            <img src={bg} className="App-bg" alt="bg" />
            <Typography
              color="primary" variant="h1"
              style={{ zIndex: 3, fontSize: '1em', fontWeight: 550, textShadow: 'black 0px 0.1em 0.3em' }}>
              3MLE to MS2MML converter
            </Typography>
          </header>
          <Form className="App-form" />
          <div className="SocialButton" style={{ position: 'fixed', top: 0, left: 0, zIndex: 10 }}>
            <Tooltip title="Find this project on GitHub!" placement="right">
              <a className="btn github" href="https://github.com/mohan-cao/3MLE2MS2"><FontAwesomeIcon className="fa" icon={faGithubAlt} /></a>
            </Tooltip>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
