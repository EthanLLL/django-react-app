import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';

@inject('AuthStore', 'CommonStore', 'NavStore')
@withRouter
@observer
class Login extends Component {

  componentDidMount() {
    this.props.NavStore.setLoginActive()
  }

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
    if (this.props.CommonStore.isLogin) {
      this.props.history.replace('/')
    }
  }

  render() {
    const { values } = this.props.AuthStore;
    return (
      <div>
      <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
      >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' inverted textAlign='center'>
          登陆
        </Header>
        <Segment>
          <Form size='large'>
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
            <Button 
              style={{backgroundColor: '#4a4c8e', color: 'white'}}
              // color='violet' 
              fluid 
              size='huge'
              onClick={this.handleClick.bind(this)} >Login</Button>
          </Form>
        </Segment>
        <Message>
          新朋友？ <Link to='/register/'>注册</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
    );
  }
}

export default Login;