import React, { useState } from "react";

const ProductDetails = ({ product, cartProductIds, wishlistedProductIds, handleAddToCart, handleWishlist, navigate }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    return (
        <div>
            <h2>{product.Name || 'Product Name'}</h2>
            <p>Price: ${product.Price || '0.00'}</p>
            <p>Inclusive of all taxes</p>
            
            <h3>Select Size</h3>
            <div className="product-sizes">
                <p>Select Size:</p>
                {product.Sizes?.length > 0 ? (
                    product.Sizes.map((size, index) => (
                        <label key={index} style={{ marginRight: '10px' }}>
                            <input
                                type="radio"
                                name="size"
                                value={size}
                                style={{ marginRight: '5px' }}
                                onChange={() => setSelectedSize(size)}
                            />
                            {size}
                        </label>
                    ))
                ) : (
                    <p>No sizes available</p>
                )}
            </div>

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
    );
};

export default ProductDetails;
