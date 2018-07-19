import React, { Component } from 'react';
import { Divider, Image, Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Notification } from 'element-react';

class CanvaItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_active: this.props.item.is_active,
      is_handled: this.props.item.is_handled
    }
  }

  handleImageGroupClick = () => {
    console.log(this.props.item)
    const payload = this.props.item
    axios.post(`http://localhost:7001/api/v1/elements/`, payload)
      .then(res => {
        if (res.data.succ === true) {
          this.setState({
            is_handled: true,
            is_active: true
          })
        }
        Notification({
          title: res.data.succ === true ? 'success' : 'error',
          message: res.data.msg,
          duration: 2000,
          type: res.data.succ === true ? 'success' : 'error'
        });
      })
  }

  render() {
    const {item} = this.props
    return (
      <div>
        <Header as='h4' color='yellow'>
          {item.title}
        </Header>
        <Image.Group>
          {item.source_files.map((img, i) => (
            <Image key={i} size='small' src={img.source_file} />
            ))}    
        </Image.Group>
        {
          this.state.is_handled === false && this.state.is_active === false ? 
          <div>
            <Button onClick={this.handleImageGroupClick}>OK~</Button>
            <Button>不OK，要改~</Button>
          </div> :
          <Header as='h5' color='red'>已处理</Header>
        }
        <Divider />
      </div>
    );
  }
}

export default CanvaItem;