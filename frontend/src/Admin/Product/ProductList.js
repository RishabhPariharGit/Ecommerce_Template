import React, { useState, useEffect, useRef } from 'react';
import { getAllProducts,deleteProduct } from '../../Services/ProductService/ProductService_admin'; 
import { useNavigate } from 'react-router-dom'; 


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 
    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!isFetchedRef.current) {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts(); 
                setProducts(response.data); 
                setError(null); 
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setIsLoading(false); 
            }
        };

        fetchProducts();
        isFetchedRef.current = true;
    }
    }, []);

    const handleEdit = (productSlug) => {
        navigate(`/admin/Product/edit/${productSlug}`); 
    };

    const handleCreate = (e) => {
        e.preventDefault(); 
        navigate('/admin/Product/create');
    };
    
    const handleDelete = async (ProductId) => {
        if (window.confirm("Are you sure you want to delete this Product?")) {
            try {
              const response  = await deleteProduct(ProductId); 
              if(response){
                alert(response.message)
                setProducts(products.filter(product => product._id !== ProductId)); 
              }
                
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };
    
    return (
        <div>
            <div className="white-bg-btn">
            <div className='title-bread-crumbs'>
               <p>Product List</p> 
               </div>
            <button className="button" onClick={handleCreate}>
                        Create Product
                    </button>
                    </div>

            <div className="form-600">
                <div className="white-bg">
                    
                    {error && <div className="error">{error}</div>} 
                    <table className="tablestyle">
                        <thead>
                            <tr className="roundheader">
                                <th>Name</th>
                                <th>Price</th>
                                <th>SKU</th>
                                <th>Category</th>
                                <th className="buttoncolumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.Slug}>
                                        <td>{product.Name}</td>
                                        <td>{product.Price}</td>
                                        <td>{product.SKU}</td>
                                        <td>{product.CategoryName}</td> {/* Assuming the product has a CategoryName field */}
                                        <td>
                                        <div className='customization-main-btns'>
                                            <button
                                                className="gridbutton"
                                                onClick={() => handleEdit(product.Slug)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="gridbutton delete-button"
                                                onClick={() => handleDelete(product._id)} // Add delete button
                                            >
                                                Delete
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No products found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
