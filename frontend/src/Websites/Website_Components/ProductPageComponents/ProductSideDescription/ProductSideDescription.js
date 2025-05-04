import React, { useState } from "react";
import './ProductSideDescription.css';
import Accordion from "../../SecondaryComponents/Accordion/Accordion";

const ProductDetails = ({ product, cartProductIds, wishlistedProductIds, handleAddToCart, handleWishlist, navigate }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const accordionSections = [
        {
          title: 'Delivery & Returns',
          content: <p>Free delivery within 3–5 business days. Easy returns within 30 days.</p>,
        },
        {
          title: 'Care Instructions',
          content: (
            <ul>
              <li>Hand Wash Preferred: Use lukewarm water and a mild detergent specifically designed for wool.</li>
              <li>Machine Wash if allowed: Use the wool/delicate cycle with cold water and a wool-friendly detergent.</li>
              <li>Avoid Hot Water & Agitation: This can shrink or felt the wool.</li>
              <li>Machine Wash if allowed: Use the wool/delicate cycle with cold water and a wool-friendly detergent.</li>
              <li>Avoid Hot Water & Agitation: This can shrink or felt the wool.</li>
            </ul>
          ),
          rightIcon: 'stars',
        },
        {
          title: 'Product Information',
          content: <p>Material: 100% Cotton. Made in India. Machine washable.</p>,
        },
      ];

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
            <div className="main-prodiuct-secondary-details-wrapper-content-product-description">
            <p>{product.Description}</p>
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
            <div className="main-prodiuct-secondary-details-wrapper-content accordion-item">
           <Accordion sections={accordionSections}/>
           </div>
        </div>
        
    );
};

export default ProductDetails;
