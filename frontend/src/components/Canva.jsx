import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Divider, Image, Header, Button, Visibility, Loader } from 'semantic-ui-react'
import CanvaItem from './CanvaItem';

@inject('NavStore')
@withRouter
@observer
class Canva extends Component {

  constructor() {
    super();
    this.state = {
      list: [],
      offset: 0,
      hasNext: true
    }
  }

  // componentWillMount() {
  //   this._fetchElements()
  // }

  _fetchElements = () => {
    axios.get(`/api/v1/canva_elements?offset=${this.state.offset}&limit=30`)
      .then(res => {
        this.setState({
          list: this.state.list.concat(res.data.data),
          offset: this.state.offset + 30
        })
      })
  }

  handleLoaderVisible = () => {
    this._fetchElements();
    // this._fetchElements()
  }

  componentDidMount() {
    this.props.NavStore.setCanvaActive();
  }

  render() {
    return (
      <div>
        {this.state.list.map((item, i) => (
          <div key={item.id}>
            <CanvaItem item={item} />
          </div>
        ))}
        <Visibility onOnScreen={this.handleLoaderVisible} continuous={true}>
            <div className='post-list-loader'>
              <Loader active inverted inline='centered' />
            </div>
          </Visibility>
        {/* {
          this.state.hasNext === true ?
          <Visibility onOnScreen={this.handleLoaderVisible} continuous={true}>
            <div className='post-list-loader'>
              <Loader active inverted inline='centered' />
            </div>
          </Visibility> :
            <div className='post-list-loader'>
              <Header as='h3' textAlign='center' inverted>No more post~</Header>
            </div>
        } */}
      </div>
    );
  }
}

export default Canva;