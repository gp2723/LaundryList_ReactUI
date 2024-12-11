import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { getCourses } from "../services/api";

// Course Table Component
const CourseTable = () => {

    const [allCourses, setAllCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Get courses from API
      getCourses()
      .then((coursesData) => {
          setAllCourses(coursesData ? coursesData : []);
          setCourses(coursesData ? coursesData : []);
          setIsLoading(false);
      })
      .catch((error) => {
          console.error('Error while fetching courses:', error);
          setAllCourses([]);
          setCourses([]);
          setIsLoading(false);
      });
    }, []);

    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
      if (searchTerm.length === 0) {
          setCourses([...allCourses]);
      } else {
          const filteredCourses = courses.filter((course) =>
              course.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          setCourses([...filteredCourses]);
      }
    };

    return (
      <>
      {
        isLoading ? (
          <Spinner animation="grow" />
        ) : (
        <div>
        <h1>Course Table</h1>
        <div className="search-bar">
            <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
        <table className="course-table">
            <thead>
            <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Assignments</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {courses.map((course) => (
                <tr key={course.id}>
                <td>{course.course_code}</td>
                <td>{course.name}</td>
                <td><Link to={`/courses/${course.id}/assignments`}>View Assignments</Link></td>
                <td>{course.created_at.split('T')[0]}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        )
      }
      </>
    );
};

export default CourseTable;