import React, { useState, useEffect } from 'react';
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
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Dummy data for courses
    const dummyCourses = [
      { id: 1, name: 'Cloud Computing', date: '2024-12-01' },
      { id: 2, name: 'Data Science 101', date: '2024-11-15' },
      { id: 3, name: 'Web Development Basics', date: '2024-10-25' },
      { id: 4, name: 'Machine Learning Fundamentals', date: '2024-09-30' },
    ];
    setCourses(dummyCourses);
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <>
                <li><Link to="/login">Login</Link></li>
              </>
              }
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUserToken={setUserToken} />} />
            <Route path="/courses" element={<CourseTable courses={filteredCourses} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
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
