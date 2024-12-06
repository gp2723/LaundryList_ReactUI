import { Link } from 'react-router-dom';

const Login = ({ setUserToken }) => {

    const handleLoginClick = () => {
        console.log('Login button clicked. This would hit the BE API to authenticate the user.');
        setUserToken('dummyUserToken');
    }   

    return (
        <>
            <h1>Login Form will be here</h1>
            <Link to="/" onClick={() => handleLoginClick()}>Login</Link>
        </>
    );
};

export default Login;