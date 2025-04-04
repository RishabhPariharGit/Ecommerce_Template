


import api from '../Api_Intersecptor/AxiosWebsite';

export const getAllProductsBySlug = async (Slug) => {
    try {
      
        const response = await api.get(`/AllProducts/${Slug}`); 
      
        return response.data;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
    }
  };