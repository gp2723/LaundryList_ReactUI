import { Link } from "react-router-dom";

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

export default CourseTable;