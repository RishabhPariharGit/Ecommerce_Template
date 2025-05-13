import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 
// Add Usps
export const addUsps = async (UspsData) => {
    try {
      
        console.log("UspsData",UspsData.IconBlocks)
          const token = Cookies.get('token');
      
          const headers = {
            withCredentials: true,
          };
      
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.post('/CreateUsps', UspsData);
        return response.data;
    } catch (error) {
        console.error('Error adding Usps:', error);
        throw error;
    }
};

// Get All Categories
export const getAllUspss = async () => {
    try {
        const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.get('/GetAllUsps');
        return response.data;
    } catch (error) {
        console.error('Error fetching Uspss:', error);
        throw error;
    }
};

// Get Usps by Slug
export const getUspsById = async (Id) => {
    try {
        
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.get(`/Usps/Edit/${Id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Usps by Id:', error);
        throw error;
    }
};

// Update Usps
export const updateUsps = async (Id, UspsData) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.put(`/UpdateUsps/${Id}`, UspsData);
        return response.data;
    } catch (error) {
        console.error('Error updating Usps:', error);
        throw error;
    }
};

// Delete Usps
export const deleteUsps = async (UspsId) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.delete(`/DeleteUsps/${UspsId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Usps:', error);
        throw error;
    }
};

