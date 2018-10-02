import React, { Component } from 'react';
import { Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap';
import PopoverItem from '../PopoverItem';
import axios from 'axios';

import FormTemplate from './FormTemplate';
import FlowChart from '../../assets/img/PanelistManager_Instructions.jpeg';

export default class PanelistManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      
      FoundUser: false,
      eMailAddress: "",
      // --- form fields ---
      formData: null,
      emailState: false,
    }
  }

  toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen })
  }

  handleChange = (e) => {
    this.setState({ formData: null})
    if( e.target.name === "eMailAddress" ) {
      this.setState({ [e.target.name]: e.target.value })
      let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/igm
      if ( re.test(e.target.value) ) {
        console.log('valid email')
        this.setState({emailState: true })
      }else {
        console.log('invalid email')
        this.setState({emailState: false })
      }
    }else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  findUser = (e) => {
    e.preventDefault();
    this.setState({formData: ""})

    if( !this.state.emailState ) {
      window.alert('Invalid Email')
    }else {
      axios.post(`${process.env.REACT_APP_URL}/getUserByEmail`, {
        eMailAddress: this.state.eMailAddress
      })
      .then(resp => resp.data)
      .then(data => {
        if(data[0]) {
          this.setState({formData: data[0]})
        }else {
          let confirm = window.confirm(`No record found matching this email address: ${this.state.eMailAddress} \n\n`
                                        +"Do you want to start adding this record using a blank form?")
          if(confirm) {
            this.setState({formData: {
              eMailAddress: this.state.eMailAddress,
              FirstName: "",
              LastName: "",
              Birthdate: "",
              Gender: "",
              Tel: "",
              Address: "",
              City: "",
              State: "",
              PostalCode: "",
            }})
          }
        }
      })
      .catch((e) => {
        console.log(e)
      })
    }
  }

  report = (e) => {
    e.preventDefault();
    if(this.state.eMailAddress != null) {
      let answer = window.confirm(`Are you sure you want to report the following as being a duplicate account? \n
          Email: ${this.state.eMailAddress}
        `)
      if(answer) {
        fetch(`${process.env.REACT_APP_URL}/DuplicateReport?email=${this.state.eMailAddress}`, {
          headers: this.state.MyHeader
        }).then(data => {
          if(data.status === 401) {
            window.alert('unauthorized')
          }else {
            return data.json()
          }
        })
        .then(data => {
          window.alert(data.msg)
          this.setState({formData: null})
        })
      }
    }else {
      window.alert(`Can't report an empty email.`)
    }
  }

  clearForm = (e) => {
    console.log('invoking clearForm')
    this.setState({formData: null})
  }

  render() {
    return (
      <Row>
        <Col sm="12" md="12" lg="12">
          <div style={{marginRight:"15px"}}>Flow Chart Instruction <PopoverItem  sm="12" md="12" lg="12" isImage id="flow-chart-img" body={FlowChart} /></div>
        </Col>

        <Col sm="12" md="12" lg="12">
          <Row>
            <Form onSubmit={this.findUser} inline>
              <Col>
                <Input type="email" name="eMailAddress" id="eMailAddress" value={this.state.eMailAddress} onChange={this.handleChange} style={{
                  minWidth:"300px"
                }} invalid={!this.state.emailState} placeholder="Enter email" /> 
                <FormFeedback>Invalid email format</FormFeedback>
                {/* <FormFeedback valid>Email is in a valid format!</FormFeedback> */}
              </Col>
              <Col>
                <Button color="primary" onClick={this.findUser} style={{marginRight:"5px"}}><span>Find Panelist</span></Button>
                <Button color="danger" onClick={this.report} style={{marginRight:"5px"}}><span>Report</span></Button>
                <PopoverItem style={{marginLeft:"10px"}} id="popover-finding-report" title="Finding Panelists / Report" body="* Find Panelist: To prevent any duplicate records, you are forced to search for a person's email first. \n If there are no matches, you will be prompted with a blank form to start filling out the record. * Report: If you have accidentally create a record, you can use this to report to IT the record and it will be deleted within 24 hours. " />
              </Col>
            </Form>
          </Row>
        
          <hr />


          <Row>
            { this.state.formData
              ? <FormTemplate data={this.state.formData} clearForm={this.clearForm} />
              : ""
            }
          </Row>
        </Col>

      </Row>
    )
  }
}