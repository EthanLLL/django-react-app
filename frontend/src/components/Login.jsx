import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { history } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('AuthStore', 'CommonStore')
@withRouter
@observer
class Login extends Component {

  handleUsernameChange = e => {
    this.props.AuthStore.setUsername(e.target.value)
  }

  handleEmailChange = e => {
    this.props.AuthStore.setEmail(e.target.value)
  }

  handlePasswordChange = e => {
    this.props.AuthStore.setPassword(e.target.value)
  }

  handleClick(e){
    e.preventDefault()
    this.props.AuthStore.login()
    if (this.props.CommonStore.token) {
      this.props.history.replace('/')
    }
  }

  render() {
    const { values, errors, inProgress } = this.props.AuthStore
    return (
      <div>
      <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
      >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          登陆
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              size='huge'
              icon='user'
              name='username'
              value={values.username}
              onChange={this.handleUsernameChange.bind(this)}
              iconPosition='left'
              placeholder='Username'
            />
            <Form.Input
              fluid
              size='huge'
              icon='user'
              name='email'
              value={values.email}
              onChange={this.handleEmailChange.bind(this)}
              iconPosition='left'
              placeholder='Email'
            />
            <Form.Input
              fluid
              size='huge'
              icon='lock'
              name='password'
              value={values.password}
              onChange={this.handlePasswordChange.bind(this)}
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button color='teal' 
                    fluid size='large'
                    onClick={this.handleClick.bind(this)} >Login</Button>
          </Segment>
        </Form>
        <Message>
          新朋友？ <a href='/register/'>注册</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
    );
  }
}

export default Login;