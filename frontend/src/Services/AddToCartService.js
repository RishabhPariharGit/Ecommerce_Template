
import axios from 'axios';
import Cookies from 'js-cookie'; 
const API_URL = 'http://localhost:8080';
export const addProductToCart = async (ProductData) => {
    try {
      const token = Cookies.get('token'); // Retrieve token from cookies
  
      if (!token) {
        throw new Error('No token found. Please login again.');
      }
  
      const response = await axios.post(
        `${API_URL}/AddToCart`,
        ProductData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
          withCredentials: true, // Ensure cookies are sent
        }
      );
  
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }
  }; 
  
  export const addProductToWishlist = async (ProductData) => {
    try {
      const token = Cookies.get('token'); // Retrieve token from cookies
  
      if (!token) {
        throw new Error('No token found. Please login again.');
      }
  
      const response = await axios.post(
        `${API_URL}/AddToWishlist`,
        ProductData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
          withCredentials: true, // Ensure cookies are sent
        }
      );
  
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error adding product to Wishlist:', error);
      throw error;
    }
  }; 

  export const getCartItems = async (token) => {
    try {
      debugger
      const response = await axios.get(`${API_URL}/GetCartItems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };