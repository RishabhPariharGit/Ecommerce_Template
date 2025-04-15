
import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 


export const getAllUsers  = async () => {
    try {
        const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
     
      const response = await api.get('/GetAllUsers');
      return response.data;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

  export const deleteUser = async (UserId) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      
      const response = await api.delete(`/DeleteUser/${UserId}`);
      return response;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };
  