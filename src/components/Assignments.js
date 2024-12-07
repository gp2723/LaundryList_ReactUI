import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { postGenerateAIResponse } from '../services/api';

// Assignment Details Component
const AssignmentDetails = () => {
    const { courseId } = useParams(); // Get courseId from the URL
    const [assignment, setAssignment] = useState(null);
    const [courseName, setCourseName] = useState('');

    const [show, setShow] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [generatedAIResponse, setGeneratedAIResponse] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
        1: { title: 'Assignment 1', dueDate: '2024-12-15', isQuiz: 'No', dateCreated: '2024-11-01', description: 'This assignment is about Cloud Computing' },
        2: { title: 'Assignment 2', dueDate: '2024-11-30', isQuiz: 'Yes', dateCreated: '2024-10-25', description: 'This assignment is about Data Science' },
        3: { title: 'Assignment 3', dueDate: '2024-11-05', isQuiz: 'No', dateCreated: '2024-10-01', description: 'This assignment is about Web Development' },
        4: { title: 'Assignment 4', dueDate: '2024-10-15', isQuiz: 'Yes', dateCreated: '2024-09-15', description: 'This assignment is about Machine Learning' },
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

    // Function to generate AI response
    const handleGenerateAIResponse = () => {
        
        // Wait for the AI response
        const response = postGenerateAIResponse(userInput, assignment.title, assignment.description);

        // Show the response
        console.log('AI response generated');
        console.log(response);
        setGeneratedAIResponse(response);
    };

  
    return (
      <div>
        {assignment ? (
          <>
          <div>
            <h2>Assignment Details</h2>
            <br></br>
            <p><strong>Course Name:</strong> {courseName}</p>
            <p><strong>Date Created:</strong> {assignment.dateCreated}</p>
            <p><strong>Due Date:</strong> {assignment.dueDate}</p>
            <p><strong>Is Quiz:</strong> {assignment.isQuiz}</p>
          </div>

          <Button
            color="primary"
            onClick={handleShow}
          >
            Ask SurfAI
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>SurfAI</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Get help from SurfAI to generate a response for this assignment.</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
              <Button color="primary" onClick={handleGenerateAIResponse} >
                Ask
              </Button>
              <br />
              <br />
              <p>AI response will be displayed here...</p>
            </Modal.Body> 
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
};

export default AssignmentDetails;