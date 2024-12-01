import axios from 'axios';

const API_URL = 'http://localhost:3000/api/company/loss-accessor'; // Updated API URL for Loss Accessors

export const LossAccessorService = {
    // Fetch all loss accessors
    async fetchLossAccessor() {
        try {
            const response = await axios.get(`${API_URL}`, { withCredentials: true });
            return response; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to fetch loss accessors');
            } else {
                throw new Error('Failed to fetch loss accessors');
            }
        }
    },

    // Create a new loss accessor
    async createLossAccessor(lossAccessorData) {
        try {
            const response = await axios.post(`${API_URL}`, lossAccessorData, { withCredentials: true });
            return response; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to create loss accessor');
            } else {
                throw new Error('Failed to create loss accessor');
            }
        }
    },

    // Fetch a single loss accessor by ID
    async fetchLossAccessorById(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
            return response;
        } catch (error) {
            throw new Error('Failed to fetch loss accessor by ID');
        }
    },

    // Update a loss accessor
    async updateLossAccessor(id, lossAccessorData) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, lossAccessorData, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw new Error('Failed to update loss accessor');
        }
    },

    // Delete a loss accessor
    async deleteLossAccessor(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete loss accessor');
        }
    }
};