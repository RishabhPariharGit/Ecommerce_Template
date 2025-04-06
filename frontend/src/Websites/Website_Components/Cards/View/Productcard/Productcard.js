import React from 'react';
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import './Productcard.css';

const Productcard = ({
    product,
    handleAddToCart,
    handleWishlist,
    isWishlisted,
}) => {
    return (
        <div className='main-product-card-main-wrapper'>
            <div className='image-and-icons-main-wrapper'>
            <Link to={`/product/${product.Slug}`}>
                <img
                    src={product.Product_Main_image}
                    alt={product.Name}               
                />
                 </Link>
                <div className="discount-badge">-33%</div>
                <div className='product-card-wishlist-btn-main-wrapper'>
                    {isWishlisted ? (
                        <button style={{ color: 'red' }}>❤️</button>
                    ) : (
                        <button onClick={() => handleWishlist(product)}><CiHeart size={20} /></button>
                    )}
                </div>
            </div>
            <div className='main-product-card-description-main-wrapper'>
            <Link to={`/product/${product.Slug}`}>
                <h2>{product.Name}</h2> </Link>
                <p>{product.Description}</p>
                <p>
                    <span className="old-price">{product.Price}</span>
                    <span className="price">{product.Price}</span>
                </p>
                <button className='add-to-cart' onClick={() => handleAddToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Productcard;
