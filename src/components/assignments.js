import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
            <h2>Assignment Details</h2>
            <br></br>
            <p><strong>Course Name:</strong> {courseName}</p>
            <p><strong>Date Created:</strong> {assignment.dateCreated}</p>
            <p><strong>Due Date:</strong> {assignment.dueDate}</p>
            <p><strong>Is Quiz:</strong> {assignment.isQuiz}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
};

export default AssignmentDetails;