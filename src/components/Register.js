import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../services/api.js';

const Register = ({ setUserToken }) => {
  const [uniId, setUniId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleRegisterClick = async () => {
    setError(''); // Clear previous errors
    try {
      const data = await register(uniId, password, email, name);
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('token_expiry', data.expires);
      setUserToken(data.token); 
      window.location.href = '/courses';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Register to access your HWLaundryList!</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="formBasicUNI">
          <Form.Label>UNI</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UNI ID"
            value={uniId}
            onChange={(e) => setUniId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button variant="primary" onClick={handleRegisterClick} style={{marginRight: '10px'}}>
          Register
        </Button>
        <Button as={Link} to="/" variant="outline-secondary">Home</Button>
      </Form>
    </>
  );
};

export default Register;
