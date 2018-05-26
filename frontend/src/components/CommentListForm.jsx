import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

@inject('PostStore', 'CommentStore')
@observer
class CommentListForm extends Component {

  handleCommentChange = e => {
    const comment = e.target.value
    this.props.CommentStore.setNewComment(comment)
  }

  handleCommentSubmit = () => {
    this.props.CommentStore.createNewCommentToPost(this.props.post_id, this.props.idx)
  }

  render() {
    const {newComment} = this.props.CommentStore
    return (
      <Input size='mini' fluid type='text' placeholder='Comment to author...'>
        <input value={newComment} onChange={this.handleCommentChange} />
        <Button onClick={this.handleCommentSubmit}>Submit</Button>
      </Input>
    );
  }
}

export default CommentListForm;