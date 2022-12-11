import React, { useState } from "react";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function User() {
  const [enableSignup, setEnableSignup ] = useState('disabled');
  const [enableLogin, setEnableLogin ] = useState('active');

  const toggleState = (event) => {
    console.log(event.target.id);  
      enableSignup === 'active'? setEnableSignup('disabled'): setEnableSignup('active');
      enableLogin === 'active'? setEnableLogin('disabled'): setEnableLogin('active');
  }
 
if(enableSignup === 'disabled') {
    return  (
    <Container className="mb-30" fluid>
    <Row className="justify-content-md-center">
      <Col className="col-2 p-2 mt-5">
        <ButtonGroup size="lg">
          <Button variant='secondary' onClick={toggleState} id="signup" className={enableSignup}>Sign Up</Button>
          <Button variant='secondary' onClick={toggleState} id="signup" className={enableLogin}>Login</Button>
        </ButtonGroup>
      </Col>
    </Row>

    <Row className="justify-content-md-center">
      <Col className="col-6 p-5" >
        <SignupForm>
       </SignupForm>
       </Col>
    </Row>
    </Container>
  );
} else {
    return (
    <Container className="mb-30" fluid>
        <Row className="justify-content-md-center">
          <Col className="col-2 p-2 mt-5">
            <ButtonGroup size="lg">
              <Button variant='secondary' onClick={toggleState} id="signup" className={enableSignup}>Sign Up</Button>
              <Button variant='secondary' onClick={toggleState} id="signup" className={enableLogin}>Login</Button>
            </ButtonGroup>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
           <Col className="col-6 p-5" >
            <LoginForm>
            </LoginForm>
          </Col>
        </Row>
    </Container>
    );
  }
}
