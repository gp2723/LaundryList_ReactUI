// This API service will make the HTTP requests to the backend APIs.
import axios from 'axios';

// ## GenAI API requests ##

// POST method to send user input, assigment title, and description
export const postGenerateAIResponse = async (userInput, assignmentTitle, description) => {
    try {
        let response = await axios.post('http://44.202.47.119:8000/generate_AI_response', {
            user_message: userInput,
            assignment_title_description: assignmentTitle + '\n\n' + description
        });
        return response.data;
    } catch (error) {
        console.error('Error while fetching data from GenAI API', error);
    }
}

// Login API
const BASE_URL = 'http://ec2-54-224-53-11.compute-1.amazonaws.com:8000';

export const login = async (uniId, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uni_id: uniId, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await response.json();

    if (!data.token) {
        throw new Error('Token is missing in the response');
    }
    
    // Handle success (the token and expiration are included in the response)
    console.log('Login successful:', data.message);
    console.log('Token:', data.token);
    console.log('Expires:', data.expires);

    return data;

  } catch (error) {
    if (error instanceof Error) {
        console.error('Error during login:', error.message);
    }
  }
};

export const register = async (uniId, password, email, name) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uni_id: uniId, password, email, name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const data = await response.json();

    if (!data.token) {
        throw new Error('Token is missing in the response');
    }
    
    // Handle success (the token and expiration are included in the response)
    console.log('Registeration successful:', data.message);
    console.log('Token:', data.token);
    console.log('Expires:', data.expires);

    return data;

  } catch (error) {
    if (error instanceof Error) {
        console.error('Error during register:', error.message);
    }
  }
};