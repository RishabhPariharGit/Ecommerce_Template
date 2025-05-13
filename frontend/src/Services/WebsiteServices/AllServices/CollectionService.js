

import api from '../Api_Intersecptor/AxiosWebsite';

export const getColletionByname = async (Name) => {
  
    try { 
      const response = await api.post(`/GetColletionByname`, { Name }); 
      
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };