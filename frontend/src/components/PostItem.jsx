import React, { Component } from 'react';
import { Image, Button, Icon, Card, Comment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import CommentList from './CommentList';

@inject('PostStore')
@observer
class PostItem extends Component {

  handleCommentClick = () => {
    this.props.PostStore.viewCommentList(this.props.item.idx)
  }

  render() {
    let { item } = this.props
    const head_img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526878356692&di=7a2cba7d1293bfa945d98ba86f22b135&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb03533fa828ba61e3c41e74c4234970a304e5921.jpg'
    return (
      <Card key={item.id} fluid>
        <Card.Content>
          <Image floated='left' size='mini' src={head_img} />
          <Card.Header>
            {item.user.username}
          </Card.Header>
          <Card.Meta>
            {item.timestamp}
          </Card.Meta>
          <Card.Description>
            {item.content}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Button size='mini'>
            <Icon name='like' /> 赞
          </Button>
          <Button color='violet' size='mini' onClick={this.handleCommentClick}>
            <Icon name='comment' />
            评论
          </Button>
        </Card.Content>
        {this.props.PostStore.postList[item.idx].comment_list === true &&
          <Card.Content>
            <Comment.Group>
              <CommentList post_id={item.id} idx={item.idx} />
            </Comment.Group>  
          </Card.Content>
        }
      </Card>
    );
  }
}

export default PostItem;