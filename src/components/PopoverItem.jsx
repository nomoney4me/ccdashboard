import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

class PopoverItem extends Component {
  constructor(props) {
    super(props);
   
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      title: null,
      body: null,
      id: this.props.id,
    }
  }

  getStudyInfo = () => {

  }

  componentWillMount() {
    let body;
    if(this.props.isImage) {
      body = <PopoverBody key="img"><a href={this.props.body} target="_blank">FlowChart</a></PopoverBody>
    }else if(this.props.isStudy) {
      body = <PopoverBody key="study">{this.props.body}</PopoverBody> 
    }else {
      let propbody = this.props.body.split('\\n');
      body = propbody.map((data, index) => {
        let tmp = data.split('*')
        if(tmp.length > 1) {
          tmp = <li>{tmp}</li>
          return <PopoverBody key={index}>{tmp}</PopoverBody> 
        }else {
          return <PopoverBody key={index}>{tmp}</PopoverBody>  
        }
      })
    }

    this.setState({body: body})
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <span>
        {/* <FontAwesome name="info-circle" /> */}
        <FontAwesome id={this.state.id} onClick={this.toggle} name="question-circle" />
        <Popover placement="right" isOpen={this.state.popoverOpen} target={this.state.id} toggle={this.toggle}>
          <PopoverHeader>{this.props.title}</PopoverHeader>
          {this.state.body}
        </Popover>
      </span>
    )
  }
}

export default PopoverItem;