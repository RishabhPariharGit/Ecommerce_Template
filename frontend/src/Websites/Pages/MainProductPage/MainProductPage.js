import { useParams, useNavigate } from 'react-router-dom';
import useFetchProducts from '../../../Hooks/useFetchProducts';
import Cookies from 'js-cookie'; // For reading cookies
import { addProductToCart, addProductToWishlist } from '../../../Services/AddToCartService';
import { Link } from 'react-router-dom';

const MainProductPage = () => {
    const { slug } = useParams(); // Get slug from URL
    const navigate = useNavigate(); // For navigation
    const { products, loading, error } = useFetchProducts(slug); // Fetch products

    // Handle Add to Cart action
    const handleAddToCart = async (product) => {
        debugger
        const token = Cookies.get('token'); // Get token from cookies

        if (!token) {
            // If no token found, redirect to login page
            navigate('/login');
            return;
        }

        try {
            const response = await addProductToCart({
                ProductId: product._id,
                Quantity: 1, // Default quantity
            });

            if (response.status === 201) {
                alert('Product added to cart successfully!');
            } else {
                alert('Failed to add product to cart.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleWishlist = async (product) => {
        debugger
        const token = Cookies.get('token'); // Get token from cookies

        if (!token) {
            // If no token found, redirect to login page
            navigate('/login');
            return;
        }

        try {
            const response = await addProductToWishlist({
                ProductId: product._id,
                Quantity: 1, // Default quantity
            });

            if (response.status === 201) {
                alert('Product added to wishlist successfully!');
            } else {
                alert('Failed to add product to wishlist.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('An error occurred. Please try again.');
        }
    };
    if (loading) return <p>Loading...</p>; // Loading state
    if (error) return <p>{error}</p>; // Error message

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
                                    src={product.Product_image}
                                    alt={product.Name}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            </Link>
                            <button onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                            <button onClick={() => handleWishlist(product)}>
                                Wishlist
                            </button>
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
