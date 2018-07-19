import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter,
  HashRouter
} from 'react-router-dom'
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Message from '../components/Message';
import { observer, inject } from 'mobx-react';
import Canva from '../components/Canva';

@inject('UserStore', 'CommonStore')
@withRouter
@observer
class Router extends Component {

  render() {

    return (
      <HashRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/message" component={Message} />
          <Route path="/canva" component={Canva} />
          <Route path="/" component = {Home} />
        </Switch>
      </div>
      </HashRouter>
    );
  }
}

export default Router;