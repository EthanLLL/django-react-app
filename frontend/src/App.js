import React, { Component } from 'react';
import './App.css';
import Router from './routes';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';


@inject('UserStore', 'CommonStore', 'RouteStore')
@withRouter
@observer
class App extends Component {

  constructor(props) {
    super(props)

    this.props.RouteStore.history = this.props.history
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
