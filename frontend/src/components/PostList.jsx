import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PostItem from './PostItem';
import { Card } from 'semantic-ui-react';


@inject('PostStore', 'CommonStore')
@observer
class PostList extends Component {

  componentWillMount() {
    this.props.PostStore.getPostList()
  }

  render() {
    const { PostStore } = this.props
    return (
      <div className='post-list'>
        <Card.Group>
          {PostStore.postList.map((item, i) => (
            <PostItem key={item.id} item={item} />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default PostList;