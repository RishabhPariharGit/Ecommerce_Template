import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../../../Services/WebsiteServices/AllServices/ProductService';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { addProductToCart, getCartItems }
 from '../../../Services/WebsiteServices/AllServices/AddToCartService';
import { addProductToWishlist, getWishListItems } 
from '../../../Services/WebsiteServices/AllServices/WishlistService';
import './SingleProductpage.css';
import ImageGallery from "../../Website_Components/SecondaryComponents/ImageGallery/ImageGallery";
import ProductDetails from 
"../../Website_Components/ProductPageComponents/ProductSideDescription/ProductSideDescription";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProductUsps from '../../Website_Components/ProductPageComponents/ProductUsps';
import ImageWithText from '../../Website_Components/ProductPageComponents/ImageWithText';
// import ProductReviews from '../../../Website_Components/SecondaryComponents/';
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer';


const SingleProductpage = () => {
    const [product, setProduct] = useState(null);
    const [cartProductIds, setCartProductIds] = useState(new Set());
    const [wishlistedProductIds, setWishlistedProductIds] = useState(new Set());
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const isFetchedRef = useRef(false);
    const navigate = useNavigate();
    const { slug } = useParams();

  

    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchProduct = async () => {
                try {
                    const response = await getProductBySlug(slug);
                    if (response?.data) {
                 
                        const updatedProduct = {
                            ...response.data,
                            Product_image: [
                                response.data.Product_Main_image,
                                ...response.data.Product_image,
                            ]
                        };
                    
                        setProduct(updatedProduct);
                    } else {
                        alert('Product not found!');
                        navigate('/');
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

    const nextImage = () => {
        if (product?.Product_image?.length > 0) {
            setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.Product_image.length);
        }
    };

    const prevImage = () => {
        if (product?.Product_image?.length > 0) {
            setSelectedImageIndex((prevIndex) =>
                (prevIndex === 0 ? product.Product_image.length - 1 : prevIndex - 1)
            );
        }
    };


    const handleAddToCart = async (product) => {
        
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

    useEffect(() => {
        if (product?.Product_image && product.Product_image.length > 0) {
            setSelectedImageIndex(0); // Reset index when product changes
        }
    }, [product]);

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
                    <div className='main-image-carousel-wrapper'>
                        <div className='main-image-thumbnail-wrapper'>
                            <ImageGallery
                                images={product.Product_image}
                                onImageHover={(index) => setSelectedImageIndex(index)}
                            />
                        </div>
                        <div className='main-image-display-wrapper'>
                            <img
                                src={product.Product_image[selectedImageIndex]}
                                alt="Selected"
                                key={selectedImageIndex} // Force re-render on index change
                            />
                            <div className='main-product-carousel-buttons-wrapper'>
                                <button onClick={prevImage}>{<MdOutlineKeyboardArrowLeft />}</button>
                                <button onClick={nextImage}>{<MdOutlineKeyboardArrowRight />}</button>
                            </div>
                        </div>
                    </div>
                    <div className='main-product-details-wrapper'>
                        <div className='main-prodiuct-secondary-details-wrapper'>
                            <ProductDetails
                                product={product}
                                cartProductIds={cartProductIds}
                                wishlistedProductIds={wishlistedProductIds}
                                handleAddToCart={handleAddToCart}
                                handleWishlist={handleWishlist}
                                navigate={navigate}
                            />

                        </div>
                    </div>
                </div>
                <ProductUsps/>
                <ImageWithText/>
                {/* <ProductReviews/> */}
                <Footer/>
            </div>
        </>
    );
};

export default SingleProductpage;
