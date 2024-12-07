import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({ setUserToken }) => {

    const handleLoginClick = () => {
        console.log('Login button clicked. This would hit the BE API to authenticate the user.');
        setUserToken('dummyUserToken');
    }   

    return (
        <>
            <h1>Login to access your Laundry List!</h1>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button as={Link} to="/" variant="primary" onClick={() => handleLoginClick()}>Login</Button>
            </Form>
        </>
    );
};

export default Login;