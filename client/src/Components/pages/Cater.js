import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { validateEmail } from '../../utils/auth';
import emailjs from '@emailjs/browser';
import Modal from 'react-bootstrap/Modal';
import AuthService from '../../utils/auth';
import Swal from 'sweetalert2';

export default function Contact() {

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log(formState)

  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    /* if user is logged in, get name and email from token */
    if (AuthService.isLoggedIn() && formState.message) {
      const userData = AuthService.getUserFromToken();
      formState.name = userData.data.fullName;
      formState.email = userData.data.email;
      Swal.fire({
        icon: 'success',
        text: `Thank you ${formState.name} for your request!  Our team will reach back out shortly`,
      }
      )
      emailjs.send('service_9nf8itl', 'template_858brqf', { formState }, 'C8S5M9CyzbHsWjtS2')
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
          console.log('FAILED...', error);
        });
      setFormState({ email: "", name: "", message: "" })

    } else if(!validateEmail(formState.email) || !formState.message || !formState.name){
      console.log(formState.email)
      console.log(validateEmail(formState.email))
        Swal.fire({
          icon: 'error',
          text: `You must have a message to send this form`,
        })} else{
          emailjs.send('service_9nf8itl', 'template_858brqf', { formState }, 'C8S5M9CyzbHsWjtS2')
          .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function (error) {
            console.log('FAILED...', error);
        });
        setFormState({ email: "", name: "", message: "" })
        }
    }

    console.log(formState)

  /* if user is not logged in, collect the name, and email */
  if (!AuthService.isLoggedIn()) {
    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto", height: '75vh' }}>
        <h3 className='p-4 text-center'>Catering Request</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={formState.name}
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={formState.email}
              name="email"
              onChange={handleInputChange}
              type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicMessage">
            <Form.Label>Message Us</Form.Label>
            <Form.Control
              value={formState.message}
              name="message"
              onChange={handleInputChange}
              as="textarea"
              aria-label="With textarea" />
          </Form.Group>
          <Button variant="secondary mt-2" onClick={handleFormSubmit} type="submit">
            Submit
          </Button>
        </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Uhh Oh!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please complete all fields with a valid email address.  Thanks!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className='p-5' style={{ maxWidth: "1000px", margin: "0 auto", height: '75vh' }}>
        <h3 className='p-4 text-center'>Catering Request</h3>
        <Form>
          <Form.Group controlId="formBasicMessage">
            <Form.Label>Please send us a message with your requirements and the date for your event, and we'll be in touch with you shortly. </Form.Label>
            <Form.Control
              value={formState.message}
              name="message"
              onChange={handleInputChange}
              as="textarea"
              aria-label="With textarea" />
          </Form.Group>
          <Button variant="primary mt-2" onClick={handleFormSubmit} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
