import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../../../Services/ProductService';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { addProductToCart, getCartItems } from '../../../Services/AddToCartService';
import { addProductToWishlist ,getWishListItems} from '../../../Services/WishlistService';
import './MainProductpg.css';

const SingleProductpage = () => {
    const [product, setProduct] = useState(null); // State for product data
    const [cartProductIds, setCartProductIds] = useState(new Set());
    const [wishlistedProductIds, setWishlistedProductIds] = useState(new Set());
    const isFetchedRef = useRef(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchProduct = async () => {
                try {
                    const response = await getProductBySlug(slug);
                    console.log('API Response:', response);
                    if (response?.data) {
                        setProduct(response.data);
                    } else {
                        console.error('Product data is missing from the API response.');
                        alert('Product not found!');
                        navigate('/'); // Redirect to home if product not found
                    }
                } catch (err) {
                    console.error('Error fetching product:', err);
                    alert('Failed to fetch product. Please try again.');
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
            fetchProduct();
            isFetchedRef.current = true;
        }
    }, [slug, navigate]);

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

    // Display a loading message while fetching data
    if (!product) {
        return (
            <div>
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <>
            <div className="main-dispaly-complete-wrapper">
                <div className="two-segment-devider">
                    <div className="product-complete-desc-main-wrapper">
                        <div className="Product-main-head-main-wrapper">
                            <p>{product.Name || 'Product Name'}</p>
                            <div className="Product-sub-head-main-wrapper">
                              
                            </div>
                        </div>

                        {/* Main Product Image */}
                        <div className="main-product-image-wrapper">
                            {product.Product_Main_image ? (
                                <img
                                    src={product.Product_Main_image}
                                    alt={`${product.Name || 'Product'} Main Image`}
                                    className="main-product-image"
                                    style={{ width: '250px', height: 'auto', objectFit: 'cover', margin: '5px' }}
                                />
                            ) : (
                                <p>Main image not available</p>
                            )}
                        </div>

                        {/* Additional Product Images */}
                        <div className="product-images-wrapper">
                            {product.Product_image?.length > 0 ? (
                                product.Product_image.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`${product.Name || 'Product'} Image ${index + 1}`}
                                        className="product-image"
                                        style={{ width: '200px', height: 'auto', objectFit: 'cover', margin: '5px' }}
                                    />
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="product-price">
                            <p>Price: ${product.Price || '0.00'}</p>
                        </div>

                        {/* Sizes */}
                        <div className="product-sizes">
                            <p>Select Size:</p>
                            {product.Sizes?.length > 0 ? (
                                product.Sizes.map((size, index) => (
                                    <label key={index} style={{ marginRight: '10px' }}>
                                        <input type="radio" name="size" value={size} style={{ marginRight: '5px' }} />
                                        {size}
                                    </label>
                                ))
                            ) : (
                                <p>No sizes available</p>
                            )}
                        </div>

                        {/* Add to Cart and Wishlist Buttons */}
                        <div className="product-buttons">
                            {cartProductIds.has(product._id) ? (
                                <button onClick={() => navigate('/checkout/cart')}>Go to Cart</button>
                            ) : (
                                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            )}
                            {wishlistedProductIds.has(product._id) ? (
                                <button style={{ color: 'red' }}>Wishlisted</button>
                            ) : (
                                <button onClick={() => handleWishlist(product)}>Wishlist</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProductpage;
