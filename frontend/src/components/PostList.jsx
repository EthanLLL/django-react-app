import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('PostStore', 'CommonStore')
@observer
class PostList extends Component {

  componentWillMount() {
    this.props.PostStore.getPostList()
  }

  render() {
    const { PostStore } = this.props
    return (
      <div>
        <p>{this.props.CommonStore.isLogin.toString()}</p>
        {PostStore.postList.map((item, i) => (
          <div key={item.id}>
            <p>{item.user.username}</p>
            <p>{item.content}</p>
            <p>{item.timestamp}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default PostList;