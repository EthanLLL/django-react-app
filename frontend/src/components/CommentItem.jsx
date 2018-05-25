import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';

class CommentItem extends Component {
  render() {
    const {item} = this.props
    return (
      <Comment>
        <Comment.Avatar src='/assets/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author>
            <a>
            {item.comment_by.username} 
            </a> 
            {
              item.comment_to && 
              <span className='comment-to'>
                to
                <a className='comment-to'>{item.comment_to.username}</a>
              </span>
            }
          </Comment.Author>
          <Comment.Metadata>
            <div>{item.timestamp}</div>
          </Comment.Metadata>

          <Comment.Text>{item.comment}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

export default CommentItem;