import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin/company'; // Backend API URL for companies

export const CompanyService = {
    // Fetch all companies
    async fetchCompany() {
        try {
            const response = await axios.get(`${API_URL}`);
            return response; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to fetch companies');
            } else {
                throw new Error('Failed to fetch companies');
            }
        }
    },

    // Create a new company
    async createCompany(companyData) {
        try {
            const response = await axios.post(`${API_URL}`, companyData);
            return response; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to create company');
            } else {
                throw new Error('Failed to create company');
            }
        }
    },

    // Fetch a single company by ID
    async fetchCompanyById(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response;
        } catch (error) {
            throw new Error('Failed to fetch company by ID');
        }
    },


    // Update a company
    async updateCompany(id, companyData) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, companyData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update company');
        }
    },

    // Delete a company
    async deleteCompany(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete company');
        }
    }
};