import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Router from './routes';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

@withRouter
class App extends Component {

  render() {
    return (
      <div>
        <Container>
          <Router />
        </Container>
      </div>
    );
  }
}

export default App;
