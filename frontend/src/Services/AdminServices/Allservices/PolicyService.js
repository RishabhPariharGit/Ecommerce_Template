import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 
// Add Policy
export const addPolicy = async (PolicyData) => {
    try {
      
    
         
        const response = await api.post('/CreatePolicy', PolicyData);
        return response.data;
    } catch (error) {
        console.error('Error adding Policy:', error);
        throw error;
    }
};

// Get All Categories
export const getAllPolicys = async () => {
    try {
       
        const response = await api.get('/GetAllPolicy');
        return response.data;
    } catch (error) {
        console.error('Error fetching Policys:', error);
        throw error;
    }
};

// Get Policy by Slug
export const getPolicyById = async (Id) => {
    try {
        
        
        const response = await api.get(`/Policy/Edit/${Id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Policy by Id:', error);
        throw error;
    }
};

// Update Policy
export const updatePolicy = async (Id, PolicyData) => {
    try {
      
        const response = await api.put(`/UpdatePolicy/${Id}`, PolicyData);
        return response.data;
    } catch (error) {
        console.error('Error updating Policy:', error);
        throw error;
    }
};

// Delete Policy
export const deletePolicy = async (PolicyId) => {
    try {
       
        const response = await api.delete(`/DeletePolicy/${PolicyId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Policy:', error);
        throw error;
    }
};

