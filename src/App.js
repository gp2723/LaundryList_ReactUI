import React, { useState, useEffect } from 'react';
import './App.css'; // You can style the components here

const App = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   // Fetching courses data from an API endpoint (replace with your actual endpoint)
  //   fetch('/courses')
  //     .then((response) => response.json())
  //     .then((data) => setCourses(data))
  //     .catch((error) => console.error('Error fetching courses:', error));
  // }, []);

  useEffect(() => {
    // Dummy data for now
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
    <div className="app">
      <header>
        <nav className="navbar">
          <div className="navbar-brand">CourseWorks</div>
          <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>

      <main>
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
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td><a href={`/courses/${course.id}/assignments`}>View Assignments</a></td>
                <td>{course.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer>
        <p>&copy; 2024 CourseWorks</p>
      </footer>
    </div>
  );
};

export default App;
