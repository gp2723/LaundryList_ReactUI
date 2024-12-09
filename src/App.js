import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import About from './components/About';
import AssignmentDetails from './components/Assignments';
import CourseTable from './components/Courses';
import Error from './components/Error';
import Home from './components/Home';
import Login from './components/Login';

const App = () => {

  const [userToken, setUserToken] = useState(null);

  return (
    <Router>
      <div className="app">
        <header>
          <nav className="navbar">
            <div className="navbar-brand">HWLaundryList</div>
            <ul className="navbar-links">
              { userToken ? 
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/" onClick={() => setUserToken(null)}>Logout</Link></li>
              </>
              : 
              <></>
              }
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home isUserAuthenticated={userToken} />} />
            <Route path="/login" element={<Login setUserToken={setUserToken} />} />
            <Route path="/courses" element={<CourseTable />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses/:courseId/assignments" element={<AssignmentDetails />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 CloudSurfers</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
