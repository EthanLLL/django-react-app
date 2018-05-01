import React, { Component } from 'react';
import { Card, Image, Button, Icon } from 'semantic-ui-react';

class UserCard extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Image floated='left' size='mini' src='http://p.kengdie.com/touxiang/03/57/141465082.jpg' />
            <Card.Header>
              罗震
            </Card.Header>
            <Card.Meta>
              joined by 2018-02?
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