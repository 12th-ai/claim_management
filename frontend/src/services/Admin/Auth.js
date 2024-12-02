import axios from 'axios';

// Base API URL from environment variables
const API_URL =
    import.meta.env.VITE_API_URL;

export const authService = {
    // Register user
    registerUser: async(userData) => {
        try {
            // Append the endpoint to the base URL
            const response = await axios.post(`${API_URL}/api/admin/auth/register`, userData);
            return response.data; // Success response
        } catch (error) {
            // Handle errors and display specific error messages
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'An error occurred during registration');
            } else {
                throw new Error('An error occurred during registration');
            }
        }
    },

    // Login user
    LoginUser: async(userData) => {
        try {
            // Append the endpoint to the base URL
            const response = await axios.post(`${API_URL}/api/admin/auth/login`, userData, {
                withCredentials: true, // Ensures cookies are sent with the request
            });
            return response.data; // Return success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'An error occurred during login');
            } else {
                throw new Error('An error occurred during login');
            }
        }
    },

    // Get user profile
    getProfile: async() => {
        try {
            // Send request with credentials (cookies) automatically handled by Axios
            const response = await axios.get(`${API_URL}/api/admin/auth/profile`, {
                withCredentials: true, // Ensure credentials (cookies) are sent with the request
            });

            return response.data; // Return user profile data
        } catch (error) {
            // Log error if it occurs
            console.error('Error fetching profile:', error.response ? error.response.data : error);
            throw new Error(error.response ? error.response.data.message : 'An error occurred while fetching the profile');
        }
    },

    // Logout user
    logout: async() => {
        try {
            const response = await axios.post(
                `${API_URL}/api/admin/auth/logout`, {}, {
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