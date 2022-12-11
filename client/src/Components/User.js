import React from "react";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function User() {
  return (
    <Container className="mb-30" fluid>
        <Row className="justify-content-md-center">
          <Col className="col-2 p-2 mt-5">
            <ButtonGroup size="lg" >
              <Button variant="secondary">Sign Up</Button>
              <Button variant="secondary">Login</Button>
            </ButtonGroup>
          </Col>
        </Row>

        <Row>
          <Col className="col-6 p-5">
            <SignupForm>
           </SignupForm>
           </Col>
           <Col className="col-6 p-5">
            <LoginForm>
            </LoginForm>
          </Col>
        </Row>

    </Container>
  );
}
