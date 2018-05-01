import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import Home from '../components/Home';
import Register from '../components/Register';
import Auth from '../components/Auth';
import Login from '../components/Login';
import Navbar from '../components/Navbar';

@withRouter
class Router extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component = {Home} />
          <Route exact path="/register" render={props => <Register {...props} />} />
          <Route exact path="/auth" render={props => <Auth {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default Router;