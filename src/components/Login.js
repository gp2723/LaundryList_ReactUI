import { Link } from 'react-router-dom';

const Login = ({ setUserToken }) => {

    const handleLoginClick = () => {
        console.log('Login button clicked. This would hit the BE API to authenticate the user.');
        setUserToken('dummyUserToken');
    }   

    return (
        <>
            <h1>Login to access your Laundry List!</h1>
            <Link to="/" onClick={() => handleLoginClick()}>Login</Link>
        </>
    );
};

export default Login;