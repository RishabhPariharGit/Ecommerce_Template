import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import useFetchProducts from '../../../Hooks/useFetchProducts';
import { addProductToCart, getCartItems } from '../../../Services/WebsiteServices/AllServices/AddToCartService';
import { addProductToWishlist, getWishListItems } from '../../../Services/WebsiteServices/AllServices/WishlistService';
import './Collectionpg.css';
import Productcard from '../../Website_Components/Cards/View/Productcard/Productcard';

const MainProductPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { products, loading, error } = useFetchProducts(slug);
    const [cartProductIds, setCartProductIds] = useState(new Set());
    const [wishlistedProductIds, setWishlistedProductIds] = useState(new Set());
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
        let token = Cookies.get('token');
        let guid = Cookies.get('guid');

        if (!token && !guid) {
            guid = uuidv4();
            Cookies.set('guid', guid, { expires: 30 });
        }

        try {
            const payload = {
                ProductId: product._id,
                Quantity: 1,
            };

            if (guid) {
                payload.GUID = guid;
            }

            const response = await addProductToCart(payload);

            if (response.status === 201) {
                alert('Product added to cart successfully!');
                setCartProductIds(prev => new Set([...prev, product._id]));
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
                setWishlistedProductIds(prev => new Set(prev).add(product._id));
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
        <div className='collection-main-wrapper'>
            <div className='collection-main-heading-main-wrapper'>
                <h1>{slug} Collection</h1>
                <p>Collection short description should be written here and will look great!</p>
            </div>
            <div className='collection-display-main-wrapper-devide-in-two'>
                <div className='collection-filters-main-wrapper'><p>filters</p></div>
                <div className='collection-display-main-wrapper'>
                    {products.length > 0 ? (
                        <ul>
                            {products.map(product => (
                                <Productcard
                                    key={product._id}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                    handleWishlist={handleWishlist}
                                    isWishlisted={wishlistedProductIds.has(product._id)}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>No products found for this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainProductPage;
