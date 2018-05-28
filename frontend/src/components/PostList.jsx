import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PostItem from './PostItem';
import { Card, Segment, Dimmer, Loader, Visibility } from 'semantic-ui-react';


@inject('PostStore', 'CommonStore')
@observer
class PostList extends Component {

  componentWillMount() {
    this.props.PostStore.getPostList()
  }

  handleLoaderVisible = () => {
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
        {
          PostStore.hasNext === true &&
          <Visibility onOnScreen={this.handleLoaderVisible} continuous={true}>
            <div className='post-list-loader'>
              <Loader active inverted inline='centered' />
            </div>
          </Visibility>
        }
        
      </div>
    );
  }
}

export default PostList;