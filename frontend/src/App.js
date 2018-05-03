import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Router from './routes';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';


@withRouter
@inject('RouteStore', 'UserStore', 'CommonStore')
@observer
class App extends Component {

  constructor(props) {
    super(props)

    this.props.RouteStore.history = this.props.history
  }

  componentWillMount() {
    this.props.UserStore.fatchUserInfo()
  }

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
