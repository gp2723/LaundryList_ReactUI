// This API service will make the HTTP requests to the backend APIs.
import axios from 'axios';

// ## GenAI API requests ##

// POST method to send user input, assigment title, and description
export const postGenerateAIResponse = async (userInput, assignmentTitle, description) => {
    try {
        const response = await
         axios.post('http://44.202.47.119:8000/generate_AI_response', {
            user_message: userInput,
            assignment_title_description: assignmentTitle + '\n\n' + description
        });
        return response.data;
    } catch (error) {
        console.error('Error while fetching data from GenAI API', error);
    }
}
