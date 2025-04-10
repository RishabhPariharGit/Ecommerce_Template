import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 

export const addSubCategory = async (SubCategoryData) => {
    try {
      
      const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
      const response = await api.post(`/CreateSubCategory`, SubCategoryData);
      return response.data;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

  export const getAllSubCategoriesByCategoryId = async (CategoryId) => {
    try {
      const token = Cookies.get('token');
      const headers = {
        withCredentials: true,
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await api.post(`/AllSubCategoriesByCategoryId`, { CategoryId }); 
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };

  export const getAllSubCategories  = async () => {
    try {
      
      const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
      const response = await api.get(`/GetAllSubCategories`);
      return response.data;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

  export const getSubCategoryBySlug = async (Slug) => {
    try {
      const token = Cookies.get('token');
      const headers = {
        withCredentials: true,
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
        const response = await api.get(`/SubCategory/Edit/${Slug}`); 
        return response.data;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
    }
  };

  export const updatesubCategory = async (slug, SubCategoryData) => {
    try {
      const token = Cookies.get('token');
      const headers = {
        withCredentials: true,
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await api.put(`/UpdateSubCategory/${slug}`, SubCategoryData); 
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  export const deleteSubCategory = async (subcategoryId) => {
    try {
      const token = Cookies.get('token');
      const headers = {
        withCredentials: true,
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await api.delete(`/DeleteSubCategory/${subcategoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };