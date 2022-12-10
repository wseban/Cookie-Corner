import React from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

export default function SignupForm() {
  const handleOnChange = (event) => {

  }
  const handleSignupForm = (event) => {

  }
  return (
    <div>
      <Form className='' onSubmit={handleSignupForm}>
        <FormGroup className='' id='name'>
          <FormLabel>Name</FormLabel>
          <FormControl type='string' placeholder='Enter your name' onChange={handleOnChange}></FormControl>
        </FormGroup>
        <FormGroup className='' id='email'>
          <FormLabel>Email</FormLabel>
          <FormControl type='string' placeholder='Enter your email' onChange={handleOnChange}></FormControl>
        </FormGroup>
        <FormGroup className='' id='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='string' placeholder='Enter a password' onChange={handleOnChange}></FormControl>
        </FormGroup>
        <Button className='btn-primary' type='submit'>
          Sign Up
        </Button>
      </Form>
    </div>
  )
}