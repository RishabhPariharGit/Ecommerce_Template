import api from '../Api_Intersecptor/AxiosWebsite';
import Cookies from 'js-cookie';

// Add Product to Cart
export const addProductToCart = async (ProductData) => {
    try {
        
        const guid = Cookies.get('guid'); // Retrieve GUID if available
        const token = Cookies.get('token'); // Retrieve Token if available

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
        const response = await api.post('/AddToCart', ProductData, { headers });

        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};

// Get Cart Items
export const getCartItems = async (headers) => {
    try {
        
        const response = await api.get('/GetCartItems', { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

export const getCartItemsCount = async (headers) => {
    try {
        
        const response = await api.get('/GetCartItemsCount', { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

// Remove Cart Item
export const removeCartItem = async (ItemId) => {
    try {
        
        const response = await api.delete(`/removeCartItem/${ItemId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error removing cart item:', error);
        throw error;
    }
};
