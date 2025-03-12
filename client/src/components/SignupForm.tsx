import { useState } from 'react';
import { useMutation } from '@apollo/client';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const SignupForm = ({}: { handleModalClose: () => void }) => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  });

  // Apollo mutation for adding a user
  const [addUser] = useMutation(ADD_USER);

  // State for form validation
  const [validated] = useState(false);

  // State for alert visibility
  const [showAlert, setShowAlert] = useState(false);

  // Handle input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if form is valid
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    try {
      // Use Apollo mutation to create a new user
      const { data } = await addUser({ variables: { ...userFormData } });

      // Log in user with the returned token
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset form fields
    setUserFormData({
      username: '',
      email: '',
      password: '',
      savedBooks: [],
    });
  };

  return (
    <>
      {/* Validation functionality */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Show alert if signup fails */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;

