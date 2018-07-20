import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react'
import CommentItem from './CommentItem';
import CommentListForm from './CommentListForm';
import { observer, inject } from 'mobx-react';

@inject('PostStore')
@observer
class CommentList extends Component {

  componentWillMount() {
    this.props.PostStore.getCommentList(this.props.post_id)
  }

  render() {
    const { post_id, comments } = this.props
    return (
      <React.Fragment>
        <Comment.Group size='large'>
          <CommentListForm post_id={post_id} />
          {comments.map((item, i) => (
            <CommentItem item={item} key={item.id} />
          ))}
        </Comment.Group>
      </React.Fragment>
    );
  }
}

export default CommentList;