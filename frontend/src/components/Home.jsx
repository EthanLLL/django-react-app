import React, { Component } from 'react';
import PostList from './PostList';
import UserCard from './UserCard';
import { Grid, Sticky } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PostForm from './PostForm';

@inject('CommonStore', 'NavStore')
@withRouter
@observer
class Home extends Component {

  componentDidMount() {
    this.props.NavStore.setHomeActive()
  }

  render() {
    return (
      <div className='home-component'>
        <Grid>
          <Grid.Column width={4}>
          <Sticky offset={70}>
          <UserCard />
          </Sticky>
          </Grid.Column>
          <Grid.Column width={8}>
            <PostForm />
            <PostList />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
