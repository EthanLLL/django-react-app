import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('NavStore')
@withRouter
@observer
class Message extends Component {

  componentDidMount() {
    this.props.NavStore.setMessageActive()
  }

  render() {
    return (
      <div>
        This is message
      </div>
    );
  }
}

export default Message;