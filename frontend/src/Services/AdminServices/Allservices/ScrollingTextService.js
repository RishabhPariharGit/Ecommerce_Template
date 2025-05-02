import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 
// Add ScrollingText
export const addScrollingText = async (ScrollingTextData) => {
    try {
        
          const token = Cookies.get('token');
      
          const headers = {
            withCredentials: true,
          };
      
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.post('/CreateScrollingText', ScrollingTextData);
        return response.data;
    } catch (error) {
        console.error('Error adding ScrollingText:', error);
        throw error;
    }
};

// Get All Categories
export const getAllScrollingTexts = async () => {
    try {
        const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.get('/GetAllScrollingText');
        return response.data;
    } catch (error) {
        console.error('Error fetching ScrollingTexts:', error);
        throw error;
    }
};

// Get ScrollingText by Slug
export const getScrollingTextById = async (Id) => {
    try {
        
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.get(`/ScrollingText/Edit/${Id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ScrollingText by Id:', error);
        throw error;
    }
};

// Update ScrollingText
export const updateScrollingText = async (Id, ScrollingTextData) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.put(`/UpdateScrollingText/${Id}`, ScrollingTextData);
        return response.data;
    } catch (error) {
        console.error('Error updating ScrollingText:', error);
        throw error;
    }
};

// Delete ScrollingText
export const deleteScrollingText = async (ScrollingTextId) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.delete(`/DeleteScrollingText/${ScrollingTextId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting ScrollingText:', error);
        throw error;
    }
};

