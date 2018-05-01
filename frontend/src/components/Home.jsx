import React, { Component } from 'react';
import axios from 'axios';
import PostList from './PostList';
import UserCard from './UserCard';
import { Grid } from 'semantic-ui-react';

class Home extends Component {

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
          <UserCard />
          </Grid.Column>
          <Grid.Column width={12}>
            <PostList />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
