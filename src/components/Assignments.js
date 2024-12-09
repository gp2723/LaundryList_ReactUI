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
    const [assignments, setAssignments] = useState(null);
    const [courseName, setCourseName] = useState('');

    const [show, setShow] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [generatedAIResponse, setGeneratedAIResponse] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
      // Dummy data for courses and assignments
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
  
      // Dummy assignment data
      const assignmentsData = [
        {
          "id": 1102717,
          "description": "This assignment is to setup your homework environment, download the necessary tools, and get ready for the course.",
          "due_at": "2023-09-12T03:59:59Z",
          "created_at": "2023-08-24T06:06:49Z",
          "course_id": 179299,
          "name": "hw-setup",
          "is_quiz_assignment": false,
        },
        {
          "id": 1102718,
          "description": "This assignment is to write a simple Ruby program to get you started with the Ruby programming language.",
          "due_at": "2023-09-19T03:59:59Z",
          "unlock_at": null,
          "created_at": "2023-08-24T06:07:44Z",
          "course_id": 179299,
          "name": "hw-ruby",
          "is_quiz_assignment": false,
        },
        {
          "id": 1102719,
          "description": "This assignment is to write a simple Software-as-a-Service application with a basic user interface.",
          "due_at": "2023-09-26T03:59:59Z",
          "created_at": "2023-08-24T06:08:08Z",
          "course_id": 179299,
          "name": "hw-saas",
          "is_quiz_assignment": false,
        },
        {
          "id": 1102721,
          "description": "Assignment includes setting up your Rails environment, creating a new Rails application, and running your first Rails server.",
          "due_at": "2023-10-05T03:59:59Z",
          "created_at": "2023-08-24T06:09:23Z",
          "course_id": 179299,
          "name": "hw-rails",
          "is_quiz_assignment": false,
        },
        {
          "id": 1102722,
          "description": "Assignment for Behavior Driven Development (BDD) to write tests for your Rails application.",
          "due_at": "2023-10-12T03:59:59Z",
          "created_at": "2023-08-24T06:09:58Z",
          "course_id": 179299,
          "name": "hw-bdd",
          "is_quiz_assignment": false,
        },
        {
          "id": 1102724,
          "description": "This assignment is to write tests for your Rails application using Test Driven Development (TDD).",
          "due_at": "2023-10-26T03:59:59Z",
          "created_at": "2023-08-24T06:10:57Z",
          "name": "hw-tdd",
          "is_quiz_assignment": false,
        },
        {
          "id": 1102720,
          "description": "This assignment is just for you to submit your project team members.",
          "due_at": "2023-09-28T03:59:59Z",
          "created_at": "2023-08-24T06:08:50Z",
          "name": "proj-team",
          "is_quiz_assignment": false,
        },
      ];
  
      // Find the course name based on courseId
      const course = dummyCourses.find((course) => course.id === parseInt(courseId));
      if (course) {
        setCourseName(course.name);
      }
  
      // Retrieve the assignment details for the clicked course after 1 second of delay
      setTimeout(() => {
        setAssignments(assignmentsData);
      }, 1000);

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
            <h2>Assignments for {courseName}</h2>
            <br></br>
            {
              assignments.map((assignment) => (
                <>
                  <p><strong>Assignment Name:</strong> {assignment.name}</p>
                  <p><strong>Description:</strong> {assignment.description}</p>
                  <p><strong>Is Quiz:</strong> {assignment.is_quiz_assignment ? 'Yes' : 'No'}</p>
                  <p><strong>Date Created:</strong> {assignment.created_at.split('T')[0]}</p>
                  <p><strong>Due Date:</strong> {assignment.due_at.split('T')[0]}</p>
                  <hr />
                </>
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