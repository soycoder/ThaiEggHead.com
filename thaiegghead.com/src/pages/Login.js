import React, { useState, StyleSheet } from "react";
import { Form, Container, Row, Col } from 'react-bootstrap';
import { Card, Elevation } from "@blueprintjs/core";
import { Button } from '@blueprintjs/core'

import "../App.css";

const Header = () => {
    return (
      <div style = {{color:'blue', fontSize: 50, textAlign:'center', marginTop:30}}>
        {/* ThaiEggHead.com */}
      </div>
    )
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <img src = "https://img.online-station.net/_content/2019/0619/gallery/1560920701.jpg" style ={{width:'100%', height:'100%'}}>
          </img>
        </Col>
        <Col sm={4}>
          <div className="Login">
            <Card interactive={true} elevation={Elevation.TWO}>
              <Button icon="predictive-analysis">
                Sign up with Google 
                </Button> 
              <Button icon="manual">
                Sign up via your insitution
                </Button>
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Display name</Form.Label>
                    <Form.Control
                      autoFocus
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                <Form.Group size="lg" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button rightIcon="arrow-right" intent="success" disabled={!validateForm()} style={{justifyItems:'center'}}>
                  Login
                </Button>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
      
    </Container>
    
  );
}

const Login = () => {
  return (
    <div>
      <Header/>
      <LoginForm/>
    </div>
  )
}

export default Login;