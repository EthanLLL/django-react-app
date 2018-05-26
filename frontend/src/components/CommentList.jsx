import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react'
import CommentItem from './CommentItem';
import CommentListForm from './CommentListForm';
import { observer, inject } from 'mobx-react';

@inject('PostStore')
@observer
class CommentList extends Component {

  componentWillMount() {
    this.props.PostStore.getCommentList(this.props.post_id, this.props.idx)
  }

  render() {
    const {post_id} = this.props
    const {comments} = this.props.PostStore.postList[this.props.idx]
    return (
      <div>
        <Comment.Group size='large'>
          <CommentListForm post_id={post_id} idx={this.props.idx} />
          {comments.map((item, i) => (
            <CommentItem item={item} key={item.id} post_id={this.props.post_id} idx={this.props.idx} />
          ))}
        </Comment.Group>
      </div>
    );
  }
}

export default CommentList;