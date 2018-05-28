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

  handleOnScroll = () => {
    console.log(window.scrollY)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll())
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll())
  }

  render() {
    const { PostStore } = this.props
    return (
      <div className='post-list'>
        <Card.Group onScroll={this.handleOnScroll} ref={this.cardList}>
          {PostStore.postList.map((item, i) => (
            <PostItem key={item.id} item={item} />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default PostList;