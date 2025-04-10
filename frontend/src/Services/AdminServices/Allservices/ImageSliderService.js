import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 
// Add ImageSlider
export const addImageSlider = async (ImageSliderData) => {
    try {
        
          const token = Cookies.get('token');
      
          const headers = {
            withCredentials: true,
          };
      
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.post('/CreateImageSlider', ImageSliderData);
        return response.data;
    } catch (error) {
        console.error('Error adding ImageSlider:', error);
        throw error;
    }
};

// Get All Categories
export const getAllImageSliders = async () => {
    try {
        const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.get('/GetAllImageSlider');
        return response.data;
    } catch (error) {
        console.error('Error fetching ImageSliders:', error);
        throw error;
    }
};

// Get ImageSlider by Slug
export const getImageSliderById = async (Id) => {
    try {
        
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.get(`/ImageSlider/Edit/${Id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ImageSlider by Id:', error);
        throw error;
    }
};

// Update ImageSlider
export const updateImageSlider = async (Id, ImageSliderData) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.put(`/UpdateImageSlider/${Id}`, ImageSliderData);
        return response.data;
    } catch (error) {
        console.error('Error updating ImageSlider:', error);
        throw error;
    }
};

// Delete ImageSlider
export const deleteImageSlider = async (ImageSliderId) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.delete(`/DeleteImageSlider/${ImageSliderId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting ImageSlider:', error);
        throw error;
    }
};

