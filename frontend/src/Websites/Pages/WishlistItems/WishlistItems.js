import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { getWishListItems,removeWishListItem } from '../../../Services/WishlistService';

const WishlistItems = () => {
  const [WishListItems, setWishListItems] = useState([]); // Ensure default as an array
  const [loading, setLoading] = useState(true);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      const fetchWishListItems = async () => {
        const token = Cookies.get('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        try {
          const response = await getWishListItems(token);
          console.log("response",response.WishlistItems)
      
          setWishListItems([...response.WishlistItems]); 
          console.log(WishListItems)
          
        } catch (error) {
          console.error('Error fetching wishlist items:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchWishListItems();
      isFetchedRef.current = true;
    
    }
  }, []);
  const handleRemove = async (itemId) => {
    try {
      
      await removeWishListItem(itemId);

      // Update local state to remove the item
      setWishListItems((prevItems) => prevItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing wishlist item:', error);
    }
  };
 
  if (loading) {
    return <div>Loading wishlist items...</div>;
  }

  return (
    <div className="wishlist-items">
      <h2>Your Wishlist Items</h2>
      <ul>
        {Array.isArray(WishListItems) && WishListItems.map((item) => (
          <li key={item._id} className="wishlist-item">
            <div className="wishlist-item-details">
             
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

export default WishlistItems;
