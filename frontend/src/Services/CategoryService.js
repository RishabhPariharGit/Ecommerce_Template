import axios from 'axios';
import Cookies from 'js-cookie'; 
const API_URL = 'http://localhost:8080';



export const addCategory = async (CategoryData) => {
  try {
    
    console.log(CategoryData)
    const response = await axios.post(`${API_URL}/CreateCategory`, CategoryData);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};
export const getAllCategories  = async () => {
  
  try {
    
   
    const response = await axios.get(`${API_URL}/GetAllCategory`);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};
export const getCategoryBySlug = async (Slug) => {
  try {
      const response = await axios.get(`${API_URL}/Category/Edit/${Slug}`); 
      return response;
  } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
  }
};
export const updateCategory = async (slug, CategoryData) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateCategory/${slug}`, CategoryData); 
    return response;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_URL}/DeleteCategory/${categoryId}`);
    return response;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};














