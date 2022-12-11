import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { loginUser } from '../utils/api';
import AuthService from '../utils/auth';

export default function LoginForm() {
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  }
  const handleSignupForm = async (event) => {
    event.preventDefault();

    try {
      /* send request to server to sign up */
      const response = await loginUser(loginFormData);

      if(!response.ok) {
        throw new Error(response.message);
      }
      const { token, user } = await response.json();
      /* if ok response, save JWT token */
      /* go to order page */
      if(token) {
        console.log(user);
        AuthService.saveToken(token);
      } else {
        console.log('No token returned');
      }
    } catch(err) {
      alert(err);
    }
    setLoginFormData({ email: '', password: '' });
  }
  return (
    <div className='border border-secondary rounded bg-light'>
      <Form className='p-5' onSubmit={handleSignupForm}>
        <FormGroup className='' id='email'>
          <FormLabel>Email</FormLabel>
          <FormControl type='string'
                    name='email'
                    placeholder='Enter your email'
                    value={loginFormData.email}
                    onChange={handleOnChange}>

          </FormControl>
        </FormGroup>
        <FormGroup className='' id='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='string'
                    name='password'
                    placeholder='Enter a password'
                    value={loginFormData.password}
                    onChange={handleOnChange}>

          </FormControl>
        </FormGroup>
        <Button className='btn-secondary mt-2' type='submit'>
          Login
        </Button>
      </Form>
    </div>
  )
}