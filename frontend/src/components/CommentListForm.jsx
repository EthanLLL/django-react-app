import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

@inject('PostStore', 'CommentStore')
@observer
class CommentListForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newComment: ''
    }
  }

  _clearCommentForm = () => {
    this.setState({
      newComment: ''
    })
  }

  handleCommentChange = e => {
    const comment = e.target.value
    this.setState({
      newComment: comment
    })
  }

  handleCommentSubmit = () => {
    this.props.CommentStore.createNewCommentToPost(this.props.post_id, this.state.newComment)
  }

  render() {
    const {newComment} = this.state;
    return (
      <Input size='mini' fluid type='text' placeholder='Comment to author...'>
        <input value={newComment} onChange={this.handleCommentChange} />
        <Button onClick={this.handleCommentSubmit}>Submit</Button>
      </Input>
    );
  }
}

export default CommentListForm;