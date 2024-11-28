import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin/module'; // Backend API URL

export const ModuleService = {
    // Fetch all modules
    async fetchModules() {
        try {
            const response = await axios.get(`${API_URL}`);
            return response.data; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to fetch modules');
            } else {
                throw new Error('Failed to fetch modules');
            }
        }
    },

    // Create a new module
    async createModule(moduleData) {
        try {
            const response = await axios.post(`${API_URL}`, moduleData);
            return response.data; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to create module');
            } else {
                throw new Error('Failed to create module');
            }
        }
    },

    // Fetch a single module by ID
    async fetchModuleById(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch module by ID');
        }
    },

    // Update a module
    async updateModule(id, moduleData) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, moduleData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update module');
        }
    },

    // Delete a module
    async deleteModule(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete module');
        }
    },

    // Activate a module
    async activateModule(id) {
        try {
            const response = await axios.patch(`${API_URL}/activate/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to activate module');
        }
    },

    // Deactivate a module
    async deactivateModule(id) {
        try {
            const response = await axios.patch(`${API_URL}/deactivate/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to deactivate module');
        }
    }
};