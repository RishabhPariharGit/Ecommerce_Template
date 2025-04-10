import { useState, useEffect, useRef } from 'react';
import { getAllProductsBySlug, getAllProduct,getAllProductsByGender } from '../Services/WebsiteServices/AllServices/ProductService';

const useFetchProducts = (slug) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFetchedRef = useRef(false);
    useEffect(() => {

        const fetchProducts = async () => {
            debugger
            setLoading(true);
            try {
                var response;
                if (slug == 'all-products' || slug == 'view-all') {
                    debugger
                    response = await getAllProduct();

                }
                else if (slug == "Men" || slug == "Women" || slug == "Kids") 
                {
                    response = await getAllProductsByGender(slug);
                } else {
                    let finalSlug = slug;

                    if (slug.startsWith('view-all-')) {
                        debugger
                        finalSlug = slug.replace('view-all-', '');
                    }

                    response = await getAllProductsBySlug(finalSlug);

                }

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

    }, [slug]); // Re-fetch on slug change

    return { products, loading, error };
};

export default useFetchProducts;
