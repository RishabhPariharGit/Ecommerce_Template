import { useState, useEffect, useRef } from 'react';
import { getAllProductsBySlug } from '../Services/ProductService/ProductService_website';

const useFetchProducts = (slug) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFetchedRef = useRef(false); 
    useEffect(() => {
        if (!isFetchedRef.current) {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getAllProductsBySlug(slug);
                setProducts(response.data);
                setError(null); // Clear previous errors
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        isFetchedRef.current = true;
    }
    }, [slug]); // Re-fetch on slug change

    return { products, loading, error };
};

export default useFetchProducts;
 