import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { signupUser } from '../utils/api';
import AuthService  from '../utils/auth';

export default function SignupForm() {
  const [signupFormData, setSignupFormData] = useState({fullName: '', email: '', password: ''});

  /* update the name, email or password as user inputs */
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  }

  const handleSignupForm = async (event) => {
    event.preventDefault();

    try {
      /* send request to server to sign up */
      const response = await signupUser(signupFormData);

      if(!response.ok) {
        throw new Error(response.message);
      }
      const { token, user } = await response.json();
      /* if ok response, save JWT token */
      /* go to order page */
      if(token) {
        console.log(user);
        AuthService.saveToken(token);
        document.location.href = '/dashboard';
      } else {
        console.log('No token returned');
      }
    } catch(err) {
      alert(err);
    }
    setSignupFormData({fullName: '', email: '', password: ''});
  }
  return (
    <div className='border border-secondary rounded bg-light'>
      <Form className='p-5' onSubmit={handleSignupForm} >
        <FormGroup className='' id='name'>
          <FormLabel>Name</FormLabel>
          <FormControl type='string' 
                      name='fullName' 
                      placeholder='Enter your name' 
                      value={signupFormData.fullName}
                      onChange={handleOnChange}>
          </FormControl>
        </FormGroup>
        <FormGroup className='' id='email'>
          <FormLabel>Email</FormLabel>
          <FormControl type='string' 
                      name='email' 
                      placeholder='Enter your email'
                      value={signupFormData.email}
                      onChange={handleOnChange}>
          </FormControl>
        </FormGroup>
        <FormGroup className='' id='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' 
                      name='password' 
                      placeholder='Enter a password'
                      value={signupFormData.password}
                      onChange={handleOnChange}>
          </FormControl>
        </FormGroup>
        <div className='text-center'>
        <Button className='btn-secondary mt-2' type='submit'>
          Sign Up
        </Button>
        </div>
      </Form>
    </div>
  )
}