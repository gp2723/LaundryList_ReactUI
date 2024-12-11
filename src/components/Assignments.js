import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { getAssignments, postGenerateAIResponse } from '../services/api';

// Assignment Details Component
const AssignmentDetails = () => {
    const { courseId } = useParams(); // Get courseId from the URL
    const [assignments, setAssignments] = useState(null);

    const [show, setShow] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [generatedAIResponse, setGeneratedAIResponse] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
      // Get assignments for the course from the API
      getAssignments(courseId)
      .then((assignmentsData) => {
        setAssignments(assignmentsData ? assignmentsData : []);
      })
      .catch((error) => {
        console.error('Error while fetching assignments:', error);
        setAssignments(null);
      });

    }, [courseId]);

    // Function to generate AI response
    const handleGenerateAIResponse = () => {
      
        // Get the user input from the form
        const userInput = document.getElementById('form.userInput').value;

        // Show spinner
        setProcessing(true);
      
        // Wait for the AI response
        postGenerateAIResponse(userInput, assignments[0].title, assignments[0].description)
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
        {assignments ? (
          <>
          <div>
            <h2>Assignments</h2>
            <br></br>
            {
              assignments.map((assignment) => (
                <Fragment key={assignment.id}>
                  <p><strong>Assignment Name:</strong> {assignment.name}</p>
                  <p><strong>Description:</strong> {assignment.description}</p>
                  <p><strong>Is Quiz:</strong> {assignment.is_quiz_assignment ? 'Yes' : 'No'}</p>
                  <p><strong>Date Created:</strong> {assignment.created_at.split('T')[0]}</p>
                  <p><strong>Due Date:</strong> {assignment.due_at.split('T')[0]}</p>
                  <hr />
                </Fragment>
              ))
            }
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
          <Spinner animation="grow" />
        )}
      </div>
    );
};

export default AssignmentDetails;