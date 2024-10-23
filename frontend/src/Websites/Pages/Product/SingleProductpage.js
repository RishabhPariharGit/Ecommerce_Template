import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../../../Services/ProductService';
import './MainProductpg.css';
import Announcementbar from '../../Website_Components/Announcementbar/Announcementbar';
import Newhome from '../../Website_Components/Navbar/Newhome';
import Modal from './ProductDescriptionModal/Modal';
import { Link } from 'react-router-dom';

const SingleProductpage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomPosition, setZoomPosition] = useState({ backgroundPosition: '0% 0%' });
    const [isHovered, setIsHovered] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState('black'); // New state for selected variant
    const [isModalOpen, setModalOpen] = useState(false);
    const [product, setProduct] = useState(null); // State for product data

    const allThumbnails = {
        black: [
            // Placeholder images (can be replaced with dynamic images)
            "https://via.placeholder.com/400x400?text=Product+Image+1",
            "https://via.placeholder.com/400x400?text=Product+Image+2",
        ],
        color: [
            "https://via.placeholder.com/400x400?text=Product+Image+3",
            "https://via.placeholder.com/400x400?text=Product+Image+4",
        ]
    };

    const thumbnails = product?.images?.[selectedVariant] || allThumbnails[selectedVariant];

    const updateMainDisplay = (index) => {
        setCurrentIndex(index);
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPosition({
            backgroundPosition: `${x}% ${y}%`
        });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : thumbnails.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < thumbnails.length - 1 ? prevIndex + 1 : 0));
    };

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
        setCurrentIndex(0); // Reset to the first image of the new variant
    };

    const handleClick = () => {
        setModalOpen(true); // Open modal
    };

    const handleClose = () => {
        setModalOpen(false); // Close modal
    };

    const { slug } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductBySlug(slug);
                alert(response)
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };
        fetchProduct();
    }, [slug]);

    return (
        <>
            <Announcementbar />
            <Newhome />
            <div className="main-dispaly-complete-wrapper">
                <div className='accordian-main-wrapper'>
                    <Link to='/'>
                        <p>Home</p>
                    </Link>
                    <span>/</span>
                    <Link to='/buyer'>
                        <p>Naruto-Collection</p>
                    </Link>
                    <span>/</span>
                    <p>{product?.Name}</p>
                </div>
                <div className="two-segment-devider">
                    <div className='image-main-box'>
                        <div className="main-img-wrapper">
                            {product.Product_image?.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Thumbnail ${index}`}
                                    className={index === currentIndex ? 'selected' : ''}
                                    onMouseEnter={() => updateMainDisplay(index)}
                                />
                            ))}
                        </div>
                        <div
                            className="product-display-wrapper"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={product.Product_image?.[currentIndex]}
                                id="main-display"
                                alt="Main Display"
                            />
                            <div className="slider-buttons">
                                <button id="prevBtn" onClick={handlePrev}>‹</button>
                                <button id="nextBtn">›</button>
                            </div>
                            {isHovered && (
                                <div
                                    className="zoomed-image"
                                    style={{
                                        backgroundImage: `url(${product.Product_image?.[currentIndex]})`,
                                        ...zoomPosition
                                    }}
                                />
                            )}
                        </div>
                    </div>


                    <div className='product-complete-desc-main-wrapper'>
                        <div className='Product-main-head-main-wrapper'>
                            <p>{product?.Name || "Product Name"}</p>
                            <div className='Product-sub-head-main-wrapper'>
                                <p>{product?.category || "shoes women"}</p>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className='price-details-main-wrapper'>
                            <div className='price-details-secondary-wrapper'>
                                <div className='currency-format-main-wrapper'>
                                    <p>MRP</p>
                                </div>
                                <div className='original-selling-price-main-wrapper'>
                                    <p>₹ {product?.Price}</p>
                                </div>
                                <div className='discounted-price-main-wrapper'>
                                    <p>₹ {product?.discountedPrice || product?.Price}</p>
                                </div>
                            </div>
                            <div className='price-content-main-wrapper'>
                                <p>Inclusive of all taxes</p>
                            </div>
                        </div>

                        {/* Variant Selector */}
                        <div className='variant-selector-main-wrapper'>
                            <div className='variant-image-main-wrapper'>
                                {product?.variants?.map((variant, index) => (
                                    <img
                                        key={index}
                                        src={variant.image}
                                        alt={variant.name}
                                        onClick={() => handleVariantClick(variant.name)}
                                        className={selectedVariant === variant.name ? 'selected' : ''}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className='size-select-main-wrapper'>
                            <div className='size-select-secondary-wrapper'>
                                <p>Select Size</p>
                                <p>Size Guide</p>
                            </div>
                            <div className='size-number-main-wrapper'>
                                {product?.sizes?.map((size, index) => (
                                    <div key={index} className='size-box-main-wrapper'>
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className='Buy-Buttons-Main-Wrapper'>
                            <div className='add-to-cart-main-wrapper'>
                                <button>Add to Cart</button>
                            </div>
                            <div className='wishlist-button-main-wrapper'>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                        <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                    Favourite
                                </button>
                            </div>
                        </div>

                        {/* Short Product Description */}
                        <div className='product-short-desc-main-wrapper'>
                            <div className='desc-para-main-wrapper'>
                                <p>{product?.description}</p>
                            </div>
                            <div className='desc-points-main-wrapper'>
                                <ul>
                                    <li>Filling: 100% Polyfill</li>
                                    <li>Shell: 100% Nylon</li>
                                    <li>Comfortable</li>
                                    <li>Ultra-soft touch</li>
                                </ul>
                            </div>
                            <div className='more-desc-btn-main-wrapper'>
                                <button onClick={handleClick}>View More</button>
                                <Modal isOpen={isModalOpen} onClose={handleClose} />
                            </div>
                        </div>

                        {/* Delivery Pincode Section */}
                        <div className='delivery-pincode-check'>
                            <div className='delivery-pin-head'>
                                <p>Delivery Pincode</p>
                            </div>
                            <div className='pin-check-main-wrapper'>
                                <input type="text" placeholder='Enter Pincode' />
                                <button>Check</button>
                            </div>
                        </div>

                        {/* Returns and Exchange */}
                        <div className='return-exchange-main-wrapper'>
                            <div className='return-desc-main-wrapper'>
                                <p>Easy 7-day exchange</p>
                                <p>Free shipping and COD available</p>
                                <p>100% Authentic products</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProductpage;
