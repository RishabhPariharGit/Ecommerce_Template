import React, { useState } from "react";
import './ProductDetails.css';

const ProductDetails = ({ product, cartProductIds, wishlistedProductIds, handleAddToCart, handleWishlist, navigate }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    return (
        <div className="main-prodiuct-secondary-details-wrapper-content">
            
        <div className="main-prodiuct-secondary-details-wrapper-content-spacing-mng">
        <div className="main-prodiuct-secondary-details-wrapper-content-title-and-price-wrapper">   
            <h2>{product.Name || 'Product Name'}</h2>
        <div className="main-prodiuct-secondary-details-wrapper-content-price">
            <p>${product.Price || '0.00'}</p>
            </div>
        <div className="main-prodiuct-secondary-details-wrapper-content-price-taxes">

            <p>Inclusive of all taxes</p>
            </div>
            </div>
        <div className="main-prodiuct-secondary-details-wrapper-content-product-sizes">
                <p>Select Size</p>
                <div className="main-size-select-block-wrapper">
                {product.Sizes?.length > 0 ? (
                    product.Sizes.map((size, index) => (
                        <label key={index}>
                            {/* <input
                                type="radio"
                                name="size"
                                value={size}
                                style={{ marginRight: '5px' }}
                                onChange={() => setSelectedSize(size)}
                            /> */}
                          
                            {size}
                        </label>
                    ))
                ) : (
                    <p>No sizes available</p>
                )}
                        </div>
            </div>
            </div>

            <div className="main-prodiuct-secondary-details-wrapper-content product-buttons">
            <div className="main-prodiuct-secondary-details-wrapper-content product-buttons wishlist">

            {wishlistedProductIds.has(product._id) ? (
                    <button style={{ color: 'red' }}>Wishlisted</button>
                ) : (
                    <button onClick={() => handleWishlist(product)}>Wishlist</button>
                )}
                </div>
            <div className="main-prodiuct-secondary-details-wrapper-content product-buttons add-to-cart">
               
                {cartProductIds.has(product._id) ? (
                    <button onClick={() => navigate('/checkout/cart')}>Go to Cart</button>
                ) : (
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                )}
               </div>
            </div>
        </div>
        
    );
};

export default ProductDetails;
