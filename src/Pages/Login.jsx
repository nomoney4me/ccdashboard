import React from 'react';
import { Form, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import PopoverItem from '../components/PopoverItem';


const submit = (data) => {
  console.log(data)

  axios.post(`${process.env.AUTH_URL}/auth`, {
    username: data.target.elements.username.value,
    password: data.target.elements.password.value
  })
  .then(resp => {
    if(resp.data.success) {
      window.location.href = "./pm"
    }
  })
}

const Login = (props) => {
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Form onSubmit={ e => {
              e.preventDefault()
              submit({...props, ...e})
            } } >
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" name="username" id="username"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" id="password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        Forgot Password <PopoverItem style={{marginLeft:"10px"}} id="popover-finding-report" title="Login Instruction" body="* Username: Your AD Username \n * Password: Your AD Password \n Note: If you have issues, please submit a ticket with the username that you are trying to login with." />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { state: state }
}

connect(mapStateToProps)(submit)

export default Login;
