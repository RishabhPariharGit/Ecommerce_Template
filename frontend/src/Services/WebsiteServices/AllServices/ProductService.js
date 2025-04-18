


import api from '../Api_Intersecptor/AxiosWebsite';

export const getAllProductsBySlug = async (Slug) => {
    try {
      
        const response = await api.post(`/AllProducts/${Slug}`); 
      console.log("proiductdata",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        throw error;
    }
  };

  export const getAllProductsByGender = async (Gender) => {
    try {
      
        const response = await api.post(`/AllProducts_By_Gender/${Gender}`); 
      
        return response.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        throw error;
    }
  };

  export const getAllProduct = async () => {
    try {
        const response = await api.get('/GetAllActiveProduct');
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Category:', error);
        throw error;
    }
};

export const getProductBySlug = async (Slug) => {
    try {
  
      const response = await api.get(`/Product/Edit/${Slug}`)
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };