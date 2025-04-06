import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 
// Add Announcement
export const addAnnouncement = async (AnnouncementData) => {
    try {
        debugger
          const token = Cookies.get('token');
      
          const headers = {
            withCredentials: true,
          };
      
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.post('/CreateAnnouncement', AnnouncementData);
        return response.data;
    } catch (error) {
        console.error('Error adding Announcement:', error);
        throw error;
    }
};

// Get All Categories
export const getAllAnnouncements = async () => {
    try {
        const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.get('/GetAllAnnouncement');
        return response.data;
    } catch (error) {
        console.error('Error fetching Announcements:', error);
        throw error;
    }
};

// Get Announcement by Slug
export const getAnnouncementById = async (Id) => {
    try {
        debugger
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.get(`/Announcement/Edit/${Id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Announcement by Id:', error);
        throw error;
    }
};

// Update Announcement
export const updateAnnouncement = async (Id, AnnouncementData) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.put(`/UpdateAnnouncement/${Id}`, AnnouncementData);
        return response.data;
    } catch (error) {
        console.error('Error updating Announcement:', error);
        throw error;
    }
};

// Delete Announcement
export const deleteAnnouncement = async (AnnouncementId) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.delete(`/DeleteAnnouncement/${AnnouncementId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Announcement:', error);
        throw error;
    }
};

