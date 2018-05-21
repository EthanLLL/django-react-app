import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

@inject('UserStore', 'CommonStore')
@observer
class UserCard extends Component {

  componentWillMount() {
    this.props.UserStore.fetchUserInfo()
  }

  render() {
    const { username, email } = this.props.UserStore
    return (
      <div>
        <Card>
          <Card.Content>
            <Image floated='left' size='mini' src='http://p.kengdie.com/touxiang/03/57/141465082.jpg' />
            <Card.Header>
              {username}
            </Card.Header>
            <Card.Meta>
              {email}
            </Card.Meta>
          </Card.Content>
          <Image src='http://old.bz55.com/uploads/allimg/160607/140-16060G00128.jpg' />
          <Card.Content>
            <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='user' />
            罗震的第 1 位粉丝
          </Card.Content>
          <Card.Content extra>
            <Icon name='favorite' />
            为罗震点了 10 个赞
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default UserCard;