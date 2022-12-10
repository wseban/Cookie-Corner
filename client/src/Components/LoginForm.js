import React from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

export default function LoginForm() {
  const handleOnChange = (event) => {

  }
  const handleSignupForm = (event) => {

  }
  return (
    <div>
      <Form className='' onSubmit={handleSignupForm}>
        <FormGroup className='' id='email'>
          <FormLabel>Email</FormLabel>
          <FormControl type='string' placeholder='Enter your email' onChange={handleOnChange}></FormControl>
        </FormGroup>
        <FormGroup className='' id='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='string' placeholder='Enter a password' onChange={handleOnChange}></FormControl>
        </FormGroup>
        <Button className='btn-primary' type='submit'>
          Login
        </Button>
      </Form>
    </div>
  )
}