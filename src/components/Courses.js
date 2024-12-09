import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

// Course Table Component
const CourseTable = () => {

    const [allCourses, setAllCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // Simulate loading time 1 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Dummy data for courses
        const dummyCourses = [
            {
              "id": 185810,
              "name": "Special Topics in Biomedical Informatics",
              "created_at": "2023-07-01T00:57:04Z",
              "course_code": "BINFGU4008_003_2023_3"
            },
            {
              "id": 191305,
              "name": "TOPICS IN COMPUTER SCIENCE",
              "created_at": "2023-10-13T00:57:11Z",
              "course_code": "COMSE6998_007_2024_1"
            },
            {
              "id": 194663,
              "name": "TOPICS IN COMPUTER SCIENCE",
              "created_at": "2023-11-10T01:57:47Z",
              "course_code": "COMSE6998_011_2024_1"
            },
            {
              "id": 179299,
              "name": "Engineering Software-as-a-Service",
              "created_at": "2023-03-30T01:05:09Z",
              "course_code": "COMSW4152_001_2023_3"
            },
            {
              "id": 204283,
              "name": "Cloud Computing",
              "created_at": "2024-04-05T00:58:50Z",
              "course_code": "COMSW4153_001_2024_3"
            },
            {
              "id": 194665,
              "name": "Networks, Crowds, and the Web",
              "created_at": "2023-11-10T01:57:47Z",
              "course_code": "COMSW4223_001_2024_1"
            },
            {
              "id": 191047,
              "name": "PRIN-INNOVATN/ENTREPRENEURSHIP",
              "created_at": "2023-10-12T00:57:25Z",
              "course_code": "COMSW4460_001_2024_1"
            },
            {
              "id": 179336,
              "name": "NATURAL LANGUAGE PROCESSING",
              "created_at": "2023-03-30T01:05:10Z",
              "course_code": "COMSW4705_002_2023_3"
            },
            {
              "id": 185633,
              "name": "TOPICS IN COMPUTER SCIENCE",
              "created_at": "2023-06-29T00:58:54Z",
              "course_code": "COMSW4995_031_2023_3"
            }
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