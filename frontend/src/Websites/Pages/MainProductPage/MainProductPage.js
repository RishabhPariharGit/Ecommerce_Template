import { useParams, useNavigate } from 'react-router-dom';
import useFetchProducts from '../../../Hooks/useFetchProducts';
import Cookies from 'js-cookie';
import { addProductToCart } from '../../../Services/AddToCartService';
import { addProductToWishlist } from '../../../Services/WishlistService';
import { Link } from 'react-router-dom';

const MainProductPage = () => {
    const { slug } = useParams(); 
    const navigate = useNavigate(); 
    const { products, loading, error } = useFetchProducts(slug); 

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
            } else {
                alert('Failed to add product to wishlist.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
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
