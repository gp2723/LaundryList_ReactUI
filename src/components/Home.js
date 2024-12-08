import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Home = ({ isUserAuthenticated }) => {
    return (
        <>
            <div className="home">
            <h1>Welcome to HWLaundryList!</h1>
            <p>Keep track of your laundry with ease.</p>
            </div>

            { isUserAuthenticated ?
            <></>
            :
            <>
                <Button as={Link} to="/login" variant="primary" style={{marginRight: '10px'}}>Login</Button>
                <Button as={Link} to="/register" variant="secondary">Register</Button>
            </>
        }
        </>
    );
}

export default Home;