import React, { useEffect, useState ,useRef} from 'react';
import Cookies from 'js-cookie';
import { getCartItems } from '../../../Services/AddToCartService'; // Assume this is your cart API service

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetchedRef = useRef(false);
  useEffect(() => {
    if (!isFetchedRef.current) {
    const fetchCartItems = async () => {
        debugger
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
           {/* Display the product image */}
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
         </div>
       </li>
       
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
