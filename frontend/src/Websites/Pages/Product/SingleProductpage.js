import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../../../Services/ProductService';
import Cookies from 'js-cookie';
import { addProductToCart, getCartItems } from '../../../Services/AddToCartService';
import { addProductToWishlist, getWishListItems } from '../../../Services/WishlistService';

import Announcementbar from '../../Website_Components/Announcementbar/Announcementbar';
import Newhome from '../../Website_Components/Navbar/Newhome';
import Modal from './ProductDescriptionModal/Modal';
import './MainProductpg.css';


const SingleProductpage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null); // State for product data
    const isFetchedRef = useRef(false);
    const { slug } = useParams();

    const [cartProductIds, setCartProductIds] = useState(new Set());
    const [wishlistedProductIds, setWishlistedProductIds] = useState(new Set());
    useEffect(() => {
        console.log("Slug value:", slug);
        if (!isFetchedRef.current) {
            const fetchProduct = async () => {
                try {
                    const response = await getProductBySlug(slug);
                    alert(response);
                    setProduct(response.data);
                } catch (err) {
                    console.error('Error fetching product:', err);
                }
            };
            fetchProduct();
            isFetchedRef.current = true;
        }
    }, [slug]);
   
    const handleAddToCart = async (product) => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await addProductToCart({
                ProductId: product._id,
                Quantity: 1,
            });

            if (response.status === 201) {
                alert('Product added to cart successfully!');
                setCartProductIds(prev => new Set(prev).add(product._id));
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


   
    

    return (
        <>
            <Announcementbar />
            <Newhome />
            <div className="main-dispaly-complete-wrapper">
               
            <div className="two-segment-devider">
            <div className="product-complete-desc-main-wrapper">
    <div className="Product-main-head-main-wrapper">
        <p>{product?.Name || "Product Name"}</p>
        <div className="Product-sub-head-main-wrapper">
            <p>{product?.category || "shoes women"}</p>
        </div>
    </div>

    {/* Main Product Image */}
    <div className="main-product-image-wrapper">
        {product?.Product_Main_image ? (
            <img 
                src={product.Product_Main_image} 
                alt={`${product.Name || "Product"} Main Image`} 
                className="main-product-image"
                style={{ width: '250px', height: 'auto', objectFit: 'cover', margin: '5px' }}
            />
        ) : (
            <p>Main image not available</p>
        )}
    </div>

    {/* Additional Product Images */}
    <div className="product-images-wrapper">
        {product?.Product_image?.length > 0 ? (
            product.Product_image.map((imageUrl, index) => (
                <img 
                    key={index} 
                    src={imageUrl} 
                    alt={`${product.Name || "Product"} Image ${index + 1}`} 
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
        <p>Price: ${product?.Price || "0.00"}</p>
    </div>

    {/* Sizes */}
    <div className="product-sizes">
        <p>Select Size:</p>
        {product?.Sizes?.length > 0 ? (
            product.Sizes.map((size, index) => (
                <label key={index} style={{ marginRight: '10px' }}>
                    <input 
                        type="radio" 
                        name="size" 
                        value={size} 
                        style={{ marginRight: '5px' }} 
                    />
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
