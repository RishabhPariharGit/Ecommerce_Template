import axios from 'axios';
import Cookies from 'js-cookie'; 
const API_URL = 'http://localhost:8080';


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
      return response.data;
    } catch (error) {
      console.error('Error adding product to Wishlist:', error);
      throw error;
    }
  }; 

  export const getWishListItems = async (token) => {
    try {
      
      const response = await axios.get(`${API_URL}/GetWishListItems`, {
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
  export const removeWishListItem = async (ItemId) => {
    try {
      
      const response = await axios.delete(`${API_URL}/removeWishListItem/${ItemId}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };