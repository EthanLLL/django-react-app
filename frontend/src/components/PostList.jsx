import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('PostStore')
@observer
class PostList extends Component {

  componentWillMount() {
    this.props.PostStore.getPostList()
  }

  render() {
    const { PostStore } = this.props
    return (
      <div>
        {PostStore.postList.map((item, i) => (
          <div key={i}>
            <p>{item.user}</p>
            <p>{item.content}</p>
            <p>{item.timestamp}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default PostList;