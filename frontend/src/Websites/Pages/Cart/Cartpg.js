import React, { useEffect, useState, useRef ,useContext} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getCartItems, removeCartItem } from '../../../Services/WebsiteServices/AllServices/AddToCartService';
import './Cartpg.css'
import { CartContext } from '../../../Context/CartContext';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetchedRef = useRef(false);
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);
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
      fetchCartCount();
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
    <div className="cart-items-main-wrapper">
    <div className="cart-items-main-heading">
      <h2>Your Cart Items</h2>
      <p>Keep Shopping with us we are the number one shopping destination for you, Happy Shopping!</p>
      </div>

         
      <div className='primary-wrapper-cart-divide-in-two'>
      <div className='main-cart-items-right-half-wrapper-main-class'>
      <ul className='main-cart-card-wrapper-mn-class'>
        {cartItems.map((item) => (
          <li key={item._id} className="cart-item">
            <div className="cart-item-details">
              {item.ProductId.Product_Main_image && (
                <div className='cart-card-main-image-wrapper'>                <img 
                  src={item.ProductId.Product_Main_image} 
                  alt={item.ProductId.Name} 
                  className="cart-item-image" 
                />
                </div>
              )}
              <div className='product-cart-card-info-wrapper'>
              <div className='product-cart-card-info-wrapper-name-and-quantity'>
              <p>{item.ProductId.Name}</p>
              <p><strong>Quantity:</strong> {item.Quantity}</p>
              </div>
              <div className='product-cart-card-info-wrapper-price-and-remove'>
              <p><strong>Item Price:</strong> ${item.Price}</p>
              <p><strong>Total:</strong> ${item.Price * item.Quantity}</p>
              <button onClick={() => handleRemove(item._id)} className="remove-button">Remove</button>
              </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>

      {/* Total and Checkout Section */}
      <div className='main-cart-items-left-half-wrapper-main-class'>
      <div className="cart-total">
        <h3>Total : <span>$ {calculateTotal()}</span></h3>
        <p>Tax included and shipping calculated at checkout</p>
        <button className="checkout-button"  onClick={() => handleCheckout()} >Checkout</button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default CartItems;
