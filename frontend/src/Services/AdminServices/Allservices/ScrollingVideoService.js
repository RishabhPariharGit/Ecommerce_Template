import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 
// Add ScrollingVideo
export const addScrollingVideo = async (ScrollingVideoData) => {
    try {
        
          const token = Cookies.get('token');
      
          const headers = {
            withCredentials: true,
          };
      
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.post('/CreateScrollingVideo', ScrollingVideoData);
        return response.data;
    } catch (error) {
        console.error('Error adding ScrollingVideo:', error);
        throw error;
    }
};

// Get All Categories
export const getAllScrollingVideos = async () => {
    try {
        const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.get('/GetAllScrollingVideo');
        return response.data;
    } catch (error) {
        console.error('Error fetching ScrollingVideos:', error);
        throw error;
    }
};

// Get ScrollingVideo by Slug
export const getScrollingVideoById = async (Id) => {
    try {
        
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.get(`/ScrollingVideo/Edit/${Id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ScrollingVideo by Id:', error);
        throw error;
    }
};

// Update ScrollingVideo
export const updateScrollingVideo = async (Id, ScrollingVideoData) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.put(`/UpdateScrollingVideo/${Id}`, ScrollingVideoData);
        return response.data;
    } catch (error) {
        console.error('Error updating ScrollingVideo:', error);
        throw error;
    }
};

// Delete ScrollingVideo
export const deleteScrollingVideo = async (ScrollingVideoId) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.delete(`/DeleteScrollingVideo/${ScrollingVideoId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting ScrollingVideo:', error);
        throw error;
    }
};

