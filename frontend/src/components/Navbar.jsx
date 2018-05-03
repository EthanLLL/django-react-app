import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import AuthStore from '../stores/AuthStore';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('AuthStore', 'CommonStore')
@observer
@withRouter
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e) {
    console.log(e.target.name)
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.AuthStore.logout()
  }

  render() {
    const { activeItem } = this.state
    let { isLogin } = this.props.CommonStore
    let LoginButton = ''
    if (isLogin === true) {
      LoginButton = <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleLogout} />
    }
    else {
      LoginButton = <Menu.Item as={Link} to='/login' name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
    }

    return (
      <div>
        <Menu secondary>
          <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
          
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder={isLogin.toString()} />
            </Menu.Item>
            {LoginButton}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;

