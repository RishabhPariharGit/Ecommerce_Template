


import api from '../Api_Intersecptor/AxiosWebsite';


export const getAllSubCategoryforSite = async () => {
    try {
   
        const response = await api.get('/GetAllActiveSubCategory');
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Category:', error);
        throw error;
    }
};


export const getAllSubCategoriesByCategoryId = async (CategoryId) => {
    try {
       
      const response = await api.post(`/AllSubCategoriesByCategoryId`, { CategoryId }); 
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };