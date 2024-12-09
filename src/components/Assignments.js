import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { postGenerateAIResponse } from '../services/api';

// Assignment Details Component
const AssignmentDetails = () => {
    const { courseId } = useParams(); // Get courseId from the URL
    const [assignment, setAssignment] = useState(null);
    const [courseName, setCourseName] = useState('');

    const [show, setShow] = useState(false);
    const [processing, setProcessing] = useState(false);
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
      
        // Get the user input from the form
        const userInput = document.getElementById('form.userInput').value;

        // Show spinner
        setProcessing(true);
      
        // Wait for the AI response
        postGenerateAIResponse(userInput, assignment.title, assignment.description)
          .then((response) => {
  
          // Set the user input to ''
          document.getElementById('form.userInput').value = '';

          // Hide spinner
          setProcessing(false);
          
          // Show the response
          setGeneratedAIResponse(response.response_to_student.response_to_student);
        
        });
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
                <Form.Group className="mb-3" controlId="form.userInput">
                  <Form.Label>Get help from SurfAI to generate a response for this assignment.</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter your question here..." />
                </Form.Group>
              </Form>
              {
                processing ? (
                  <Spinner animation="grow" />
                ) : (
                  <Button color="primary" onClick={handleGenerateAIResponse} >
                    Ask
                  </Button>
                )
              }
              <br />
              <br />
              {
                generatedAIResponse ? (
                  <>
                    <p>
                      AI Response:
                    </p>
                    <p>
                      {generatedAIResponse}
                    </p>
                  </>
                ) : null
              }
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