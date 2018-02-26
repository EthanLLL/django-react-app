import React, { Component } from 'react';
import axios from 'axios';
import PostList from './PostList';

class Home extends Component {

  render() {
    return (
      <div>
        <PostList />
      </div>
    );
  }
}

export default Home;
