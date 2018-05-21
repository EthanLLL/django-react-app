import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';


@inject('PostStore')
@observer
class PostForm extends Component {

  handleChange = e => {
    this.props.PostStore.setNewPost(e.target.value)
  }

  handleSubmit = () => {
    this.props.PostStore.createPost()
    this.props.PostStore.clearNewPost()
  }

  render() {
    let { newPost } = this.props.PostStore
    return (
      <div>
        <Form>
          <Form.TextArea 
            autoHeight
            placeholder='啥想说...'
            value={newPost}
            onChange={this.handleChange} />
          <Form.Button
            onClick={this.handleSubmit}>
            发布
          </Form.Button>
        </Form>
      </div>

    );
  }
}

export default PostForm;