import React, { Component } from 'react';
import { Input, Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('AuthStore', 'CommonStore', 'NavStore')
@withRouter
@observer
class Navbar extends Component {

  handleLogout = e => {
    e.preventDefault()
    this.props.AuthStore.logout()
  }

  render() {
    const { activeItem } = this.props.NavStore
    let {isLogin} = this.props.CommonStore
    return (
      <div style={{ marginBottom: '70px' }}>
        <Menu fixed='top' size='huge' inverted className='nav-color'>
        <Container>
          <Menu.Item as={Link} to='/' name='home' active={activeItem.home === true} />
          <Menu.Item name='messages' as={Link} to='/message' active={activeItem.message === true} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input size='mini' inverted icon='search' placeholder='Search something...' />
            </Menu.Item>
            {
              isLogin === true ? 
              <Menu.Item name='log out' active={activeItem.login === true} onClick={this.handleLogout} /> :
              <Menu.Item as={Link} to='/login' active={activeItem.login === true} name='log in' />
            }
          </Menu.Menu>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default Navbar;

