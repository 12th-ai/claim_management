import axios from 'axios';

const API_URL =
    import.meta.env.VITE_API_URL;



export const PermissionService = {

    // Assign modules to company
    async assignModulesToCompany(companyId, moduleIds) {
        try {
            const response = await axios.post(`${API_URL}/api/admin/permission/assign`, { companyId, moduleIds });
            return response; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to assign modules');
            } else {
                throw new Error('Failed to assign modules');
            }
        }
    },

    // Deny access to a module
    async denyAccess(requestPayload) {
        try {
            const response = await axios.post(`${API_URL}/api/admin/permission/deny-access`, requestPayload);
            return response; // Success response
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Failed to deny access');
            } else {
                throw new Error('Failed to deny access');
            }
        }
    }
};