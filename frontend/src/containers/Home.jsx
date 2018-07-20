import React, { Component } from 'react';
import PostList from '../components/PostList';
import UserCard from '../components/UserCard';
import { Grid } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PostForm from '../components/PostForm';

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
          <Grid.Column width={4} only='computer'>
          <div style={{position: 'fixed', width: '250px'}}>
            <UserCard />
          </div>
          </Grid.Column>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <PostForm />
            <PostList />
          </Grid.Column>
          <Grid.Column width={4} only='computer'>
            <div style={{position: 'fixed', width: '250px'}}>
              lalala
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
