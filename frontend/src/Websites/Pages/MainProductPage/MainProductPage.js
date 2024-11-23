import { useParams, useNavigate } from 'react-router-dom';
import useFetchProducts from '../../../Hooks/useFetchProducts';
import Cookies from 'js-cookie';
import { addProductToCart, getCartItems } from '../../../Services/AddToCartService';
import { addProductToWishlist,getWishListItems } from '../../../Services/WishlistService';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';


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
                  console.log("response",response.WishlistItems)
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Products for "{slug}"</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            <h2>{product.Name}</h2>
                            <p><strong>Description:</strong> {product.Description}</p>
                            <p><strong>Price:</strong> ${product.Price}</p>
                            <Link to={`/product/${product.Slug}`}>
                                <img
                                    src={product.Product_Main_image}
                                    alt={product.Name}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            </Link>
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
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found for this category.</p>
            )}
        </div>
    );
};

export default MainProductPage;
