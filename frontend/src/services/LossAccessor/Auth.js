import axios from 'axios';

const API_URL = 'http://localhost:3000/api/LossAccessor/auth'; // Change this URL to your backend endpoint

export const authService = {
    registerUser: async(userData) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            return response.data; // Success response
        } catch (error) {
            // Check if there's a specific error message
            if (error.response && error.response.data) {
                // If the error comes with a specific message from the backend
                throw new Error(error.response.data.message || 'An error occurred during registration');
            } else {
                // If there's no error message, return a general error
                throw new Error('An error occurred during registration');
            }
        }
    },
    LoginUser: async(userData) => {
        try {
            const response = await axios.post(
                `${API_URL}/login`,
                userData, // Request body
                {
                    withCredentials: true, // Ensures cookies are sent
                }
            );
            return response.data; // Return success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'An error occurred during login');
            } else {
                throw new Error('An error occurred during login');
            }
        }
    },

    getProfile: async() => {
        try {
            // Send request with credentials (cookies) automatically handled by Axios
            const response = await axios.get(`${API_URL}/profile`, {
                withCredentials: true, // Ensure credentials (cookies) are sent with the request
            });

            return response.data; // Return user profile data
        } catch (error) {
            // Log error if it occurs
            console.error('Error fetching profile:', error.response ? error.response.data : error);
            throw new Error(error.response ? error.response.data.message : 'An error occurred while fetching the profile');
        }
    },

    logout: async() => {
        try {
            const response = await axios.post(
                `${API_URL}/logout`, {}, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Ensures cookies are sent with the request
                }
            );
            return response.data;
        } catch (error) {
            console.error("Logout failed:", error);
            throw error; // Propagate error to the calling function
        }
    },

};