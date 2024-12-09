import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { login } from '../services/api.js';

const Login = ({ setUserToken }) => {
  const [uniId, setUniId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = async () => {
    setError(''); // Clear previous errors
    try {
      const data = await login(uniId, password);
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
      <h1>Login to access your HWLaundryList!</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
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

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button variant="primary" onClick={handleLoginClick}>
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
