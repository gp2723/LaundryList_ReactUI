import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { useParams } from 'react-router-dom';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
            <div className="navbar-brand">CourseWorks</div>
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/courses" element={<CourseTable courses={filteredCourses} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            <Route path="/courses/:courseId/assignments" element={<AssignmentDetails />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 CourseWorks</p>
        </footer>
      </div>
    </Router>
  );
};

// Course Table Component
const CourseTable = ({ courses, searchTerm, setSearchTerm }) => {
  return (
    <div>
      <h1>Course Table</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Assignments</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td><Link to={`/courses/${course.id}/assignments`}>View Assignments</Link></td>
              <td>{course.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Assignment Details Component
const AssignmentDetails = () => {
  const { courseId } = useParams(); // Get courseId from the URL
  const [assignment, setAssignment] = useState(null);
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    // Dummy data for courses and assignments
    const dummyCourses = [
      { id: 1, name: 'Cloud Computing', date: '2024-12-01' },
      { id: 2, name: 'Data Science 101', date: '2024-11-15' },
      { id: 3, name: 'Web Development Basics', date: '2024-10-25' },
      { id: 4, name: 'Machine Learning Fundamentals', date: '2024-09-30' },
    ];

    // Dummy assignment data
    const assignmentData = {
      1: { dueDate: '2024-12-15', isQuiz: 'No', dateCreated: '2024-11-01' },
      2: { dueDate: '2024-11-30', isQuiz: 'Yes', dateCreated: '2024-10-25' },
      3: { dueDate: '2024-11-05', isQuiz: 'No', dateCreated: '2024-10-01' },
      4: { dueDate: '2024-10-15', isQuiz: 'Yes', dateCreated: '2024-09-15' },
    };

    // Find the course name based on courseId
    const course = dummyCourses.find((course) => course.id === parseInt(courseId));
    if (course) {
      setCourseName(course.name);
    }

    // Retrieve the assignment details for the clicked course
    const assignmentDetails = assignmentData[courseId];
    setAssignment(assignmentDetails);
  }, [courseId]);

  return (
    <div>
      {assignment ? (
        <div>
          <h2>Assignment Details for {courseName}</h2>
          <p><strong>Due Date:</strong> {assignment.dueDate}</p>
          <p><strong>Is Quiz:</strong> {assignment.isQuiz}</p>
          <p><strong>Date Created:</strong> {assignment.dateCreated}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
