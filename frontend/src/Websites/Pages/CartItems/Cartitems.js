import React, { useEffect, useState ,useRef} from 'react';
import Cookies from 'js-cookie';
import { getCartItems ,removeCartItem } from '../../../Services/AddToCartService'; 

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetchedRef = useRef(false);
  useEffect(() => {
    if (!isFetchedRef.current) {
    const fetchCartItems = async () => {
        
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await getCartItems(token); 
        console.log("response",response)
        setCartItems(response.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
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
      console.error('Error removing wishlist item:', error);
    }
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
           {item.ProductId.Image && (
             <img 
               src={item.ProductId.Product_image} 
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
    </div>
  );
};

export default CartItems;
