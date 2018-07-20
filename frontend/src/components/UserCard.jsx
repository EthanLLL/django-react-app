import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import headLogo from '../assets/communist.jpeg';
import threeLine from '../assets/3-line.jpg';

@inject('UserStore', 'CommonStore')
@observer
class UserCard extends Component {

  componentWillMount() {
    this.props.UserStore.fetchUserInfo()
  }

  render() {
    const { username, email, user_count, likes_count } = this.props.UserStore
    return (
      <div className='usercard-fixed'>
        <Card secondary>
          <Card.Content>
            <Image floated='left' size='mini' src={headLogo} />
            <Card.Header>
              {username}
            </Card.Header>
            <Card.Meta>
              {email}
            </Card.Meta>
          </Card.Content>
          <Image src={threeLine} />
          <Card.Content>
            <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='user' />
            罗震的第 {user_count} 位粉丝
          </Card.Content>
          <Card.Content extra>
            <Icon name='favorite' />
            为罗震点了 {likes_count} 个赞
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default UserCard;