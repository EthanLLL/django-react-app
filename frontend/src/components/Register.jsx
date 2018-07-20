import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';

@inject('AuthStore')
@withRouter
@observer
class Register extends Component {

  handleUsernameChange = e => {
    this.props.AuthStore.setUsername(e.target.value)
  }

  handleEmailChange = e => {
    this.props.AuthStore.setEmail(e.target.value)
  }

  handlePasswordChange = e => {
    this.props.AuthStore.setPassword(e.target.value)
  }

  handlePasswordTwoChange = e => {
    this.props.AuthStore.setPasswordTwo(e.target.value)
  }

  handleClick(e){
    e.preventDefault()
    this.props.AuthStore.register()
  }

  render() {
    const { values } = this.props.AuthStore
    return (
      <div>
      <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
      >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' inverted textAlign='center'>
          注册
        </Header>
        <Segment>
          <Form size='large'>
            <Form.Input 
              required
              size='huge'
              fluid
              icon='user'
              name='username'
              value={values.username}
              onChange={this.handleUsernameChange.bind(this)}
              iconPosition='left'
              placeholder='Username'
            />
            <Form.Input
              size='huge'
              fluid
              icon='user'
              name='email'
              value={values.email}
              onChange={this.handleEmailChange.bind(this)}
              iconPosition='left'
              placeholder='Email'
            />
            <Form.Input
              size='huge'
              fluid
              icon='lock'
              name='password'
              value={values.password}
              onChange={this.handlePasswordChange.bind(this)}
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Form.Input
              size='huge'
              fluid
              icon='lock'
              name='password2'
              value={values.passwordTwo}
              onChange={this.handlePasswordTwoChange.bind(this)}
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button 
              style={{backgroundColor: '#4a4c8e', color: 'white'}}
              fluid size='huge'
              onClick={this.handleClick.bind(this)} >
              Register
            </Button>
          </Form>
        </Segment>
        <Message>
          已有账号？ <Link to='/login'>登陆</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
    );
  }
}

export default Register;