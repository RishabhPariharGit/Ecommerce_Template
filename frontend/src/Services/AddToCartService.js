import axios from 'axios';
import Cookies from 'js-cookie'; 
const API_URL = 'http://localhost:8080';

export const addProductToCart = async (ProductData) => {
  try {
      const token = Cookies.get('token'); // Retrieve token from cookies
      const guid = Cookies.get('guid'); // Retrieve GUID if available

      // Build headers
      const headers = {
          withCredentials: true, // Ensure cookies are sent
      };

      // Add Authorization header if token exists
      if (token) {
          headers.Authorization = `Bearer ${token}`;
      }

      // Add GUID to headers for anonymous users
      if (guid) {
          headers['x-anonymous-id'] = guid;
      }

      // Send request to backend
      const response = await axios.post(
          `${API_URL}/AddToCart`,
          ProductData,
          {
              headers,
          }
      );

      console.log(response);
      return response;
  } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
  }
};

export const getCartItems = async (headers) => {
  try {
      const response = await axios.get(`${API_URL}/GetCartItems`, {
          headers,
          withCredentials: true, // Ensure cookies are sent
      });

      return response.data; // Return the data object from the API response
  } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
  }
};

  export const removeCartItem = async (ItemId) => {
    try {
      
      const response = await axios.delete(`${API_URL}/removeCartItem/${ItemId}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };
 