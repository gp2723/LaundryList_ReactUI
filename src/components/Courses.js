import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Course Table Component
const CourseTable = () => {

    const [allCourses, setAllCourses] = useState([]);
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
        setAllCourses(dummyCourses);
        setCourses(dummyCourses);
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

export default CourseTable;