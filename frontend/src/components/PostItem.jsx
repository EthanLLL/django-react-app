import React, { Component } from 'react';
import { Image, Button, Icon, Card, Comment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import CommentList from './CommentList';
import ReactMarkdown from 'react-markdown';

@inject('PostStore')
@observer
class PostItem extends Component {

  handleCommentClick = () => {
    this.props.PostStore.viewCommentList(this.props.item.idx)
  }

  handleLikeClick = () => {
    this.props.PostStore.postLike(this.props.item.id, this.props.item.idx)
  }

  handlePostDelete = () => {
    this.props.PostStore.deletePost(this.props.item.id)
  }

  dateFormat = timestamp => {
    const date = new Date(timestamp).getTime()
    const now = new Date().getTime()
    let timeOffset = (now - date) / 1000
    if (timeOffset < 60) {
      if (timeOffset < 1) {
        timeOffset = 1
      }
      return `${parseInt(timeOffset, 10)} ${parseInt(timeOffset, 10) >= 2 ? 'secs' : 'sec'} ago`
    } else if (timeOffset / 60 < 60) {
      return `${parseInt((timeOffset / 60), 10)} ${parseInt((timeOffset / 60), 10) >= 2 ? 'mins' : 'min'} ago`
    } else if (timeOffset / 3600 < 24) {
      return `${parseInt((timeOffset / 3600), 10)} ${parseInt((timeOffset / 3600), 10) >= 2 ? 'hours' : 'hour'} ago`
    } else {
      return `${parseInt((timeOffset / 86400), 10)} ${parseInt((timeOffset / 86400), 10) >= 2 ? 'days': 'day'} ago`
    }

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
            {this.dateFormat(item.timestamp)}
          </Card.Meta>
          <Card.Description>
            <ReactMarkdown source={item.content} />
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Button size='mini' onClick={this.handleLikeClick}>
            <Icon name='like' /> 赞 {item.likes}
          </Button>
          <Button color='violet' size='mini' onClick={this.handleCommentClick}>
            <Icon name='comment' />
            评论 {item.comments_count}
          </Button>
          <Button inverted floated='right' color='red' size='mini' onClick={this.handlePostDelete}>
            <Icon name='delete' />
            删除
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