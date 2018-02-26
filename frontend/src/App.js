import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Router from './routes';

class App extends Component {

  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

export default App;
