//Product Service

import axios from 'axios';
import Cookies from 'js-cookie'; 
const API_URL = 'http://localhost:8080';

export const addProduct = async (Product) => {
    try {
      debugger
      console.log(Product)
      const response = await axios.post(`${API_URL}/CreateProduct`, Product);
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };
  export const updateProduct = async (slug, ProductData) => {
    try {
      const response = await axios.put(`${API_URL}/UpdateProduct/${slug}`, ProductData); 
      return response;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  export const getProductBySlug = async (Slug) => {
    try {
  
      const response = await axios.get(`${API_URL}/Product/Edit/${Slug}`)
      return response
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };
  export const getAllProducts  = async () => {
    try {
      
     
      const response = await axios.get(`${API_URL}/GetAllProducts`);
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };
  export const deleteProduct = async (ProductId) => {
    try {
      
      const response = await axios.delete(`${API_URL}/DeleteProduct/${ProductId}`);
      return response;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };
  export const getAllProductsBySlug = async (Slug) => {
    try {
      
        const response = await axios.get(`${API_URL}/AllProducts/${Slug}`); 
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
    }
  };