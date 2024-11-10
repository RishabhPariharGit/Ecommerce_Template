//SubCategory Service
import axios from 'axios';
import Cookies from 'js-cookie'; 
const API_URL = 'http://localhost:8080';

export const addSubCategory = async (SubCategoryData) => {
    try {
      
      console.log(SubCategoryData)
      const response = await axios.post(`${API_URL}/CreateSubCategory`, SubCategoryData);
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };
  export const getAllSubCategoriesByCategoryId = async (CategoryId) => {
    try {
  
      const response = await axios.post(`${API_URL}/AllSubCategoriesByCategoryId`, { CategoryId }); 
      return response
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };
  export const getAllSubCategories  = async () => {
    try {
      
     
      const response = await axios.get(`${API_URL}/GetAllSubCategories`);
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };
  export const getSubCategoryBySlug = async (Slug) => {
    try {
      
        const response = await axios.get(`${API_URL}/SubCategory/Edit/${Slug}`); 
        return response;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
    }
  };
  export const updatesubCategory = async (slug, SubCategoryData) => {
    try {
      const response = await axios.put(`${API_URL}/UpdateSubCategory/${slug}`, SubCategoryData); 
      return response;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  export const deleteSubCategory = async (subcategoryId) => {
    try {
      
      const response = await axios.delete(`${API_URL}/DeleteSubCategory/${subcategoryId}`);
      return response;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };