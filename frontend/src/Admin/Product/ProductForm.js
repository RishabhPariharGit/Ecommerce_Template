import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, getProductBySlug, getAllCategories, getAllSubCategoriesByCategoryId } from '../../Services/CategoryService';  // Assuming correct service functions
import '../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Price: '',
        Quantity: '',
        CategoryId: '',
        SubcategoryId: '',
        Product_image: '',
        Slug: '',
        SKU: '',
        Brand: '',
        Tags: ''
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams(); // For edit mode, get slug from the URL
    const navigate = useNavigate();

    // Load product data if in edit mode
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await getProductBySlug(slug); // Fetch product by slug
                const product = response.data;
                setFormData({
                    Name: product.Name,
                    Description: product.Description,
                    Price: product.Price,
                    Quantity: product.Quantity,
                    Slug: product.Slug,
                    CategoryId: product.CategoryId || '',
                    SubcategoryId: product.SubcategoryId || '',
                    SKU: product.SKU,
                    Brand: product.Brand,
                    Tags: product.Tags,
                    Product_image: product.Product_image // Use existing image URL for edit
                });
                setPreviewSource(product.Product_image); // Set preview source for the existing image
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setIsLoading(false); // Stop loading once data is fetched
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(); // Fetch categories from backend
                setCategories(response.data); // Assuming response.data contains categories array
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        if (isEditMode && slug) {
            loadProduct(); // Load product details in edit mode
        } else {
            setIsLoading(false); // If not in edit mode, stop loading immediately
        }

        fetchCategories(); // Fetch categories on component mount
    }, [isEditMode, slug]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleCancel = () => {
        navigate('/admin/Products'); // Redirect back to the category list
    };
    const handleCategoryInputChange = async (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            CategoryId: value,
            SubcategoryId: ''
        });

        if (value) {
            try {
                const response = await getAllSubCategoriesByCategoryId(value); // Fetch subcategories based on category
                setSubcategories(response.data);
            } catch (err) {
                console.error('Error fetching subcategories:', err);
            }
        } else {
            setSubcategories([]);
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            previewFile(file);
        } else {
            alert('Please upload a valid image file.');
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            setFormData((prevData) => ({ ...prevData, Product_image: reader.result })); // Store base64 image
        };
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault(); // Prevent form refresh

        try {
            const formPayload = new FormData(); // Use FormData to handle file upload
            formPayload.append('Name', formData.Name);
            formPayload.append('Description', formData.Description);
            formPayload.append('Price', formData.Price);
            formPayload.append('Quantity', formData.Quantity);
            formPayload.append('Slug', formData.Slug);
            formPayload.append('Product_image', formData.Product_image); // Always append Product_image
            formPayload.append('CategoryId', formData.CategoryId);
            formPayload.append('SubcategoryId', formData.SubcategoryId);
            formPayload.append('SKU', formData.SKU);
            formPayload.append('Brand', formData.Brand);
            formPayload.append('Tags', formData.Tags);

            if (isEditMode) {
                const response = await updateProduct(slug, formPayload); // Pass FormData for updating
                console.log('Product updated successfully:', response.data);
            } else {
                const response = await addProduct(formPayload); // Create a new product
                console.log('Product created successfully:', response.data);
            }
            navigate('/admin/Products'); // Redirect back to the product list after success
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Failed to submit the form. Please try again.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Render loading state while data is being fetched
    }

    return (
        <div>
            <div className="pagetitle">{isEditMode ? 'Edit Product' : 'Create a New Product'}</div>
            <div className='form-800'>
                <div className='white-bg'>
                    <div className="input-form">
                        <div className='sectionheader'>{isEditMode ? 'Edit Product' : 'Create a New Product'}</div>
                        <form onSubmit={handleSubmitFile}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='formlabel'>Name</div>
                                            <input
                                                type="text"
                                                name="Name"
                                                placeholder="Product Name"
                                                value={formData.Name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <div className='formlabel'>Slug</div>
                                            <input
                                                type="text"
                                                name="Slug"
                                                placeholder="Slug"
                                                value={formData.Slug}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='formlabel'>Price</div>
                                            <input
                                                type="number"
                                                name="Price"
                                                placeholder="Product Price"
                                                value={formData.Price}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <div className='formlabel'>Quantity</div>
                                            <input
                                                type="number"
                                                name="Quantity"
                                                placeholder="Quantity"
                                                value={formData.Quantity}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='formlabel'>SKU</div>
                                            <input
                                                type="text"
                                                name="SKU"
                                                placeholder="SKU"
                                                value={formData.SKU}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <div className='formlabel'>Brand</div>
                                            <input
                                                type="text"
                                                name="Brand"
                                                placeholder="Brand"
                                                value={formData.Brand}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <div className='formlabel'>Description</div>
                                            <textarea
                                                name="Description"
                                                placeholder="Product Description"
                                                value={formData.Description}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='formlabel'>Category</div>
                                            <select
                                                name="CategoryId"
                                                value={formData.CategoryId}
                                                onChange={handleCategoryInputChange}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.Name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <div className='formlabel'>Subcategory</div>
                                            <select
                                                name="SubcategoryId"
                                                value={formData.SubcategoryId}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Subcategory</option>
                                                {subcategories.map((subcategory) => (
                                                    <option key={subcategory._id} value={subcategory._id}>
                                                        {subcategory.Name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='formlabel'>Tags</div>
                                            <input
                                                type="text"
                                                name="Tags"
                                                placeholder="Tags"
                                                value={formData.Tags}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <div className='formlabel'>Product Image</div>
                                            <input
                                                type="file"
                                                name="Product_image"
                                                onChange={handleFileInputChange}
                                                accept="image/*"
                                            />
                                            {previewSource && (
                                                <img
                                                    src={previewSource}
                                                    alt="Preview"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" className="btn">{isEditMode ? 'Update Product' : 'Add Product'}</button>
                            <button type="button" className="button cancel-button" onClick={handleCancel}>
                                                Cancel
                                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
