import React, { useEffect, useState, useRef,useContext } from 'react';
import Cookies from 'js-cookie';
import { getWishListItems,removeWishListItem } from '../../../Services/WebsiteServices/AllServices/WishlistService';
import { addProductToCart } from '../../../Services/WebsiteServices/AllServices/AddToCartService';
import { CartContext } from '../../../Context/CartContext';
import { WishlistContext } from '../../../Context/WishlistContext';
 import './Wishlistpage.css'

const WishlistItems = () => {
  const [WishListItems, setWishListItems] = useState([]); // Ensure default as an array
  const [loading, setLoading] = useState(true);
  const isFetchedRef = useRef(false);
  const { fetchCartCount } = useContext(CartContext);
  const { fetchWishlistCount } = useContext(WishlistContext);
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
      fetchWishlistCount();
    } catch (error) {
      console.error('Error removing wishlist item:', error);
    }
  };
  const handleAddToCart = async (product) => {
        
   
    try {
        const payload = {
            ProductId: product.ProductId._id,
            Quantity: 1,
        };

       
        const response = await addProductToCart(payload);
       
        if (response) {
         
            alert(response.message);
            handleRemove(product._id)
            fetchCartCount();
        } else {
            alert('Failed to add product to cart.');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('An error occurred. Please try again.');
    }
};

 
  if (loading) {
    return <div>Loading wishlist items...</div>;
  }

  return (
    <div className="wishlist-items">
  <div className='wishlist-heading'>Your Wishlist Items</div>
  <div className="wishlist-card-container">
    {Array.isArray(WishListItems) && WishListItems.map((item) => (
      <div key={item._id} className="wishlist-card">
        <button 
          onClick={() => handleRemove(item._id)} 
          className="remove-icon"
        >
          &times;
        </button>
        <img
          src={item.ProductId.Product_Main_image}
          alt={item.ProductId.Name}
          className="wishlist-card-image"
        />
        <div className="wishlist-card-details">
          <h3>{item.ProductId.Name}</h3>
          <p><strong>Price:</strong> ₹{item.ProductId.Price}</p>
        </div>
        <div className="wishlist-card-actions">
          <button className="button" onClick={() => handleAddToCart(item)}>
            Add To Bag
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  
  );
};

export default WishlistItems;
