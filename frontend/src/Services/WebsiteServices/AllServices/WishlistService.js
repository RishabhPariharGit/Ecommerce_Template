import api from '../Api_Intersecptor/AxiosWebsite';
import Cookies from 'js-cookie';

export const addProductToWishlist = async (ProductData) => {
    try {
      const token = Cookies.get('token'); // Retrieve token from cookies
  
      if (!token) {
        throw new Error('No token found. Please login again.');
      }
  
      const response =await api.post('/AddToWishlist',
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
      
      const response = await api.get('/GetWishListItems', {
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
      
      const response = await api.delete( `/removeWishListItem/${ItemId}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  export const getWishlistCount = async (headers) => {
    try {
        debugger
        const response = await api.get('/GetWishlistCount', { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};