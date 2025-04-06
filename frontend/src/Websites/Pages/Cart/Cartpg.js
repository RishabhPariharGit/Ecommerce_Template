import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getCartItems, removeCartItem } from '../../../Services/WebsiteServices/AllServices/AddToCartService';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetchedRef = useRef(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFetchedRef.current) {
      const fetchCartItems = async () => {
        
        const token = Cookies.get('token'); // Get JWT token for authenticated users
        const guid = Cookies.get('guid'); // Get GUID for anonymous users
    
        // If neither token nor GUID exists, return early
        if (!token && !guid) {
            console.error('No token or GUID found');
            return;
        }
    
        try {
            // Determine the headers dynamically
            const headers = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`; 
            }
            if (guid) {
                headers['x-anonymous-id'] = guid; // Add GUID header for anonymous users
            }
    
            // Fetch cart items from the backend
            const response = await getCartItems(headers);
    
            if (response?.cartItems) {
                setCartItems(response.cartItems); // Update cart items state
            } else {
                console.warn('No cart items found');
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };
    
      fetchCartItems();
      isFetchedRef.current = true;
    }
  }, []);

  const handleRemove = async (itemId) => {
    try {      
      await removeCartItem(itemId);
      setCartItems((prevItems) => prevItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleCheckout = async () => {
    try {      
      const token = Cookies.get('token'); 
      if (!token) {
        navigate('/login', { state: { redirectTo: '/Checkout/cart' } });
        return;
      }else{
        navigate('/Checkout/address')
      }
    } catch (error) {
      console.error('Error redirecting to login:', error);
    }
  };
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
  };

  if (loading) {
    return <div>Loading cart items...</div>;
  }

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-items">
      <h2>Your Cart Items</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id} className="cart-item">
            <div className="cart-item-details">
              {item.ProductId.Product_Main_image && (
                <img 
                  src={item.ProductId.Product_Main_image} 
                  alt={item.ProductId.Name} 
                  className="cart-item-image" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              )}
              <p><strong>Product:</strong> {item.ProductId.Name}</p>
              <p><strong>Quantity:</strong> {item.Quantity}</p>
              <p><strong>Description:</strong> {item.Description}</p>
              <p><strong>Price:</strong> ${item.Price}</p>
              <p><strong>Total:</strong> ${item.Price * item.Quantity}</p>
              <button onClick={() => handleRemove(item._id)} className="remove-button">Remove</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total and Checkout Section */}
      <div className="cart-total">
        <h3>Total: ${calculateTotal()}</h3>
        <button className="checkout-button"  onClick={() => handleCheckout()} >Checkout</button>
      </div>
    </div>
  );
};

export default CartItems;
