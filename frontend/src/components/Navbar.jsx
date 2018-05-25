import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('AuthStore', 'CommonStore', 'NavStore')
@withRouter
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    }
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.AuthStore.logout()
  }

  render() {
    const { activeItem } = this.props.NavStore
    let {isLogin} = this.props.CommonStore
    if (isLogin) {
      return (
        <div>
          <Menu size='huge' secondary >
            <Menu.Item as={Link} to='/' name='home' active={activeItem.home === true} />
            <Menu.Item name='messages' as={Link} to='/message' active={activeItem.message === true} />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search something...' />
              </Menu.Item>
              <Menu.Item name='log out' active={activeItem.login === true} onClick={this.handleLogout} />
            </Menu.Menu>
          </Menu>
        </div>
      );
    } else {
      return (
        <div>
          <Menu size='huge' secondary >
            <Menu.Item as={Link} to='/' name='home' active={activeItem.home === true} />
            <Menu.Item name='messages' as={Link} to='/message' active={activeItem.message === true} />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search something...' />
              </Menu.Item>
              <Menu.Item as={Link} to='/login' active={activeItem.login === true} name='log in' />
            </Menu.Menu>
          </Menu>
        </div>
      )
    }
    
  }
}

export default Navbar;

