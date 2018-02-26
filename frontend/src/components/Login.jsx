import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { history } from 'react-router-dom'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      saveBox: false,
    }
  }

  _login(login_data){
    const { username, email, password } = login_data
    const payload = { username, email, password }
    console.log(payload)
    axios.post('/auth/token/', payload)
      .then(function(res){
        console.log(res.data)
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleCheck(e) {
    this.setState({
      saveBox: !this.state.saveBox
    })
  }

  handleClick(e){
    e.preventDefault()
    this._login(this.state)
  }

  render() {
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
              icon='user'
              name='username'
              value={this.state.username}
              onChange={this.handleInputChange.bind(this)}
              iconPosition='left'
              placeholder='Username'
            />
            <Form.Input
              fluid
              icon='user'
              name='email'
              value={this.state.email}
              onChange={this.handleInputChange.bind(this)}
              iconPosition='left'
              placeholder='Email'
            />
            <Form.Input
              fluid
              icon='lock'
              name='password'
              value={this.state.password}
              onChange={this.handleInputChange.bind(this)}
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