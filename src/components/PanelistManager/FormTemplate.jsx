import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, FormGroup, Button, Input } from 'reactstrap';

// import InputMask from 'react-input-mask';

import PopoverItem from '../PopoverItem';

import Cookies from 'js-cookie';

import moment from 'moment';

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);

    this.state = {
      formdata: {},
      MyHeader: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': Cookies.get('token')
      },

    }
  }

  handleChange = (e) => {
    let {name, value} = e.target
    if( name === "Birthdate" && moment.utc(value) >= moment()) {
      window.alert(`birthdate can't be in the future`)
      value = this.props.data.Birthdate
    }

    this.setState(state => ({
      formdata: {
        ...state.formdata,
        [name]: value
      }
    }))
  }

  handleInvalidSubmit(e, errors, values) {
    e.preventDefault();
  }

  handleValidSubmit = (e, errors, values) => {
    if(this.state.formdata.PersonID !== undefined) {
      this.updateUser()
    }else {
      this.addUser()
    }

  }

  componentWillMount() {
    if( this.props.data.PostalCode ) {
      let tmpobj = this.props.data
      tmpobj.PostalCode = tmpobj.PostalCode.trim()
      Object.assign(this.state.formdata, tmpobj)
    }else {
      Object.assign(this.state.formdata, this.props.data)
    }
  }

  componentWillUpdate() {
    if( this.props.data.PostalCode ) {
      let tmpobj = this.props.data
      tmpobj.PostalCode = tmpobj.PostalCode.trim()
      Object.assign(this.state.formdata, tmpobj)
    }else {
      Object.assign(this.state.formdata, this.props.data)
    }

  }
 
  addUser = () => {
    let postData = Object.keys(this.state.formdata).map(item => {
      console.log(this.state.formdata[item])
      return {"name": item, "value": this.state.formdata[item]}
    }, [])

    fetch(`${process.env.REACT_APP_URL}/newUser`, {
      headers: this.state.MyHeader,
      method: 'post',
      body: JSON.stringify(postData)
    })
    .then(body => {
      if(body.status === 401) {
        window.alert('API server is down.')
      }else {
        return body.json()
      }
    })
    .then(data => {
      window.alert(data.msg)
      this.props.clearForm()
    })
    .catch(e => {
      console.log(e)
    })
  }
  updateUser = () => {
    let postData = Object.keys(this.state.formdata).map(item => {
      return {"name": item, "value": this.state.formdata[item]}
    }, [])
    
    fetch(`${process.env.REACT_APP_URL}/updateUser/${this.state.formdata.PersonID}`, {
      headers: this.state.MyHeader,
      method: 'post',
      body: JSON.stringify(postData)
    })
    .then(resp => {
      if (resp.status === 200) {
        return resp.json()
      }else {
        return {msg: 'server error'}
      }
    })
    .then(data => {
      if(data.msg) {
        window.alert(data.msg)
        this.props.clearForm()
      }
    })
    
  }

  render() {
    return (
      <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
        <div>
          {/* {JSON.stringify(this.state.formdata)} */}
        </div>
        <Input name="PersonID" label="PersonID" type="text" onChange={this.handleChange} value={this.state.formdata.PersonID} hidden />
        <div id="infoBlock">
          <AvField name="FirstName" label="FirstName" type="text" onChange={this.handleChange} value={this.state.formdata.FirstName} required />
          <AvField name="LastName" label="LastName" type="text" onChange={this.handleChange} value={this.state.formdata.LastName} required />
          <Row>
            <Col sm="3" md="3" lg="3">
              <AvField name="Birthdate" label="Birthdate" type="date" onChange={this.handleChange} value={moment.utc(this.state.formdata.Birthdate).format('YYYY-MM-DD')} required />
            </Col>
            <Col sm="3" md="3" lg="3">
              <AvField name="Gender" label="Gender" type="select" onChange={this.handleChange} value={this.state.formdata.Gender} required>
                <option>-Select gender-</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="0">Other</option>
              </AvField>
            </Col>
            <Col sm="3" md="3" lg="3">
              <AvField name="Ethnicity" label="Ethnicity" type="select" onChange={this.handleChange} value={this.state.formdata.Ethnicity} required>
                <option>-Select ethnicity-</option>
                <option value="2">African American</option>
                <option value="5">American Indian</option>
                <option value="4">Asian</option>
                <option value="1">Caucasian</option>
                <option value="3">Hispanic</option>
                <option value="99">Other</option>
              </AvField>
            </Col>
            <Col sm="3" md="3" lg="3">
              <FormGroup>
              <AvField name="Tel" label="Tel" type="tel" onChange={this.handleChange} value={this.state.formdata.Tel} required maxLength={10} minLength={10} helpMessage="Numbers only (10 digits)" />
                {/* <Label>Phone</Label>
                <InputMask className="form-control" name="Tel" type="tel" onChange={this.handleChange} value={this.state.formdata.Tel} mask="(999) 999-9999" required /> */}
              </FormGroup>
            </Col>
          </Row>

          <hr />
          <AvField name="Address" label="Address" type="text" onChange={this.handleChange} value={this.state.formdata.Address} />

          <Row>
            <Col sm="4" md="4" lg="4">
              <AvField name="City" label="City" type="text" onChange={this.handleChange} value={this.state.formdata.City}  />
            </Col>
            <Col sm="4" md="4" lg="4">
              <AvField name="State" label="State" type="select" onChange={this.handleChange} value={this.state.formdata.State}>
                <option value="">--- Select a state ---</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </AvField>
            </Col>
            <Col sm="4" md="4" lg="4">
              {/* <Label>Zip Code</Label>
              <InputMask className="form-control" name="PostalCode" type="text" onChange={this.handleChange} value={this.state.formdata.PostalCode} mask="99999" required /> */}
              <AvField name="PostalCode" label="PostalCode" type="text" validate={{number:true}} maxLength={5} minLength={5} onChange={this.handleChange} value={ this.state.formdata.PostalCode } required />
            </Col>
          </Row>
            
          { this.state.formdata.PersonID
            ? <div style={{display:"flex", alignItems:"center"}}><Button type="submit" color="secondary" style={{marginRight:"5px"}} >Update</Button> <PopoverItem id="popover-update" title="Update" body="* If you need to update a person's email address, you will have to submit a ticket to IT. \n In the ticket: Please provide old email address and new email address. " /></div>
            : <div style={{display:"flex", alignItems:"center"}}><Button type="submit" color="info" style={{marginRight:"5px"}} >Add New</Button> <PopoverItem id="popover-addnew" title="Add New" body="* Keep a record of the PersonID incase you need to verify with IT." /></div>
          }
        </div>
      </AvForm>
    )
  }
}

export default Form;