import axios from 'axios';

const API_URL = 'http://localhost:3000/api/LossAccessor/quotation'; // Updated API URL for Quotations

export const QuotationService = {
    // Fetch all quotations
    async fetchQuotations() {
        try {
            const response = await axios.get(`${API_URL}`, { withCredentials: true });
            return response; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to fetch quotations');
            } else {
                throw new Error('Failed to fetch quotations');
            }
        }
    },

    // Create a new quotation
    async createQuotation(quotationData) {
        try {
            const response = await axios.post(`${API_URL}`, quotationData, { withCredentials: true });
            return response; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to create quotation');
            } else {
                throw new Error('Failed to create quotation');
            }
        }
    },
    // Fetch a single loss accessor by ID
    async fetchQuotationById(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
            return response;
        } catch (error) {
            throw new Error('Failed to fetch quotation by ID');
        }
    },
};