import { useParams, useNavigate } from 'react-router-dom';
import useFetchProducts from '../../../Hooks/useFetchProducts';
import Cookies from 'js-cookie';
import { addProductToCart, getCartItems } from '../../../Services/AddToCartService';
import { addProductToWishlist, getWishListItems } from '../../../Services/WishlistService';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CiHeart } from "react-icons/ci";

import './MainProductPage.css';


const MainProductPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { products, loading, error } = useFetchProducts(slug);
    const [cartProductIds, setCartProductIds] = useState(new Set());
    const [wishlistedProductIds, setWishlistedProductIds] = useState(new Set()); // Track wishlisted products
    const isFetchedRef = useRef(false);


    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchCartItems = async () => {
                const token = Cookies.get('token');
                if (!token) return;
                try {
                    const response = await getCartItems(token);
                    const productIds = new Set(response.cartItems.map(item => item.ProductId._id));
                    setCartProductIds(productIds);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            };
            const fetchWishListItems = async () => {
                const token = Cookies.get('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                try {
                    const response = await getWishListItems(token);
                    console.log("response", response.WishlistItems)
                    const productIds = new Set(response.WishlistItems.map(item => item.ProductId._id));
                    setWishlistedProductIds(productIds);

                } catch (error) {
                    console.error('Error fetching wishlist items:', error);
                }
            };
            fetchWishListItems();
            fetchCartItems();
            isFetchedRef.current = true;
        }
    }, []);

    
    const handleAddToCart = async (product) => {
        debugger
        let token = Cookies.get('token'); // Retrieve JWT token
        let guid = Cookies.get('guid'); // Retrieve GUID for anonymous users
    
        // If neither token nor GUID is available, generate a new GUID for anonymous user
        if (!token && !guid) {          
            guid = uuidv4(); // Generate a new GUID
            Cookies.set('guid', guid, { expires: 30 }); // Store GUID in cookies with 30 days expiry
        }   
    
        
        try {            
            // Prepare payload
            const payload = {
                ProductId: product._id,
                Quantity: 1,
            };
    
            // Add GUID to payload if available
            if (guid) {
                payload.GUID = guid;
            }    
    
            // Call API to add product to cart
            const response = await addProductToCart(payload);
    
            if (response.status === 201) {
                alert('Product added to cart successfully!');
                setCartProductIds((prev) => new Set([...prev, product._id]));
            } else {
                alert('Failed to add product to cart.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('An error occurred. Please try again.');
        }
    };


    const handleWishlist = async (product) => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await addProductToWishlist({
                ProductId: product._id,
                Quantity: 1,
            });
            if (response.status === 201) {
                alert('Product added to wishlist successfully!');
                setWishlistedProductIds(prev => new Set(prev).add(product._id)); // Update wishlisted state
            } else {
                alert('Failed to add product to wishlist.');
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert('An error occurred. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <div className='collection-main-wrapper'>
            <div className='collection-main-heading-main-wrapper'>
            <h1>{slug} Collection</h1>
            <p>collection short description should be written here and will look great !</p>
            </div>
            <div className='collection-display-main-wrapper-devide-in-two'>
                <div className='collection-filters-main-wrapper'><p>filters</p></div>
                <div className='collection-display-main-wrapper'>
            {products.length > 0 ? (
              <ul>
              {products.map((product) => (
                  <div className='main-product-card-main-wrapper' key={product._id}>
                      <div className='image-and-icons-main-wrapper'>
                          <img
                              src={product.Product_Main_image}
                              alt={product.Name}
                              onClick={() => window.open(`/product/${product.Slug}`, '_blank', 'noopener,noreferrer')}
                          />
                          <div className="discount-badge">-33%</div>
                          <div className='product-card-wishlist-btn-main-wrapper'>
                          {wishlistedProductIds.has(product._id) ? (
                              <button style={{ color: 'red' }}>❤️</button>
                          ) : (
                              <button onClick={() => handleWishlist(product)}><CiHeart size={20}/></button>
                          )}
                          </div>
                      </div>
                      <div className='main-product-card-description-main-wrapper'>
                          <h2>{product.Name}</h2>
                          <p>{product.Description}</p>
                          <p><span className="old-price">$89.99 USD</span> <span className="price">$59.99 USD</span></p>
                           <button className='add-to-cart' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                      </div>
                  </div>
              ))}
          </ul>
            ) : (
                <p>No products found for this category.</p>
            )}
            </div>
            </div>
            </div>
        </>
    );
};

export default MainProductPage;
