import React, { Component } from 'react';
import { Comment, Button, Input } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import axios from '../apis/axios';
import notification from '../utils/notification';
import ReactMarkdown from 'react-markdown';

@inject('PostStore', 'CommentStore')
@observer
class CommentItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCommentItemForm: false,
      commentToComment: ''
    }
  }

  _clearCommentForm = () => {
    this.setState({
      commentToComment: ''
    })
  }

  _showCommentFormToggle = () => {
    this.setState({
      showCommentItemForm: !this.state.showCommentItemForm
    })
  }

  handleReplyClick = () => {
    this._showCommentFormToggle()
  }

  handleLikeClick = () => {
    this.props.CommentStore.commentLike(this.props.item.id, this.props.post_id, this.props.idx)
  }

  handleCommentChange = e => {
    const comment = e.target.value
    this.setState({
      commentToComment: comment
    })
  }

  handleCommentCancel = () => {
    this._showCommentFormToggle()
  }

  handleCommentSubmit = () => {
    const payload = {
      comment_to_id: this.props.item.comment_by.id,
      comment: this.state.commentToComment,
    }
    axios.post(`/comments/${this.props.post_id}/`, payload)
      .then(res => {
        if (res.data.success === 1) {
          this.props.PostStore.getCommentList(this.props.post_id, this.props.idx)
          this._clearCommentForm()
          this._showCommentFormToggle()
        }
        notification(res)
      })
  }

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
          <Comment.Text><ReactMarkdown source={item.comment} /></Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={this.handleLikeClick}>Like {item.likes}</Comment.Action>
            {
              this.state.showCommentItemForm === false &&
              <Comment.Action onClick={this.handleReplyClick}>Reply</Comment.Action>
            }
          </Comment.Actions>
            {
              this.state.showCommentItemForm === true &&
              <div>
                <Input size='mini' fluid type='text' placeholder={`Comment to ${item.comment_by.username}...`}>
                  <input value={this.state.commentToComment} onChange={this.handleCommentChange} />
                </Input>
                <Button size='mini' onClick={this.handleCommentCancel}>Cancel</Button>
                <Button size='mini' onClick={this.handleCommentSubmit}>Submit</Button>
              </div>
            }
        </Comment.Content>
      </Comment>
    );
  }
}

export default CommentItem;