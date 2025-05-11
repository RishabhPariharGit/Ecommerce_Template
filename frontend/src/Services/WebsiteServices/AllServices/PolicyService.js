
import api from '../Api_Intersecptor/AxiosWebsite';

export const getPolicyBySlug = async (Slug) => {
    try {
        
        const response = await api.post(`/GetPolicyBySlug`, { Slug }); 
        return response.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        throw error;
    }
  };