import React, { useState, useEffect, useRef } from 'react';
import { getAllCategories } from '../../Services/CategoryService';
import { 
    addProduct, 
    updateProduct, 
    getProductBySlug 
} from '../../Services/ProductService';
import { getAllSubCategoriesByCategoryId } from '../../Services/SubCategoryService';
import '../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import AllSize from './EnumDropdown'; // Import the enum

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
        Tags: '',
        SizeType: '',
        Sizes: [] // Store selected sizes here
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const isFetchedRef = useRef(false); // Prevent multiple API calls

    // API calls with useEffect and ref to avoid multiple calls
    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchCategories = async () => {
                try {
                    const response = await getAllCategories();
                    setCategories(response.data);
                } catch (err) {
                    console.error('Error fetching categories:', err);
                }
            };

            const loadProduct = async () => {
                try {
                    const response = await getProductBySlug(slug);
                    const product = response.data;
                    if (product) {
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
                            Product_image: product.Product_image,
                            SizeType: product.SizeType || '',
                            Sizes: product.Sizes || [] // Assuming product.Sizes is an array
                        });
                        setPreviewSource(product.Product_image);
                    }
                } catch (err) {
                    console.error('Error fetching product:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCategories();
            if (isEditMode && slug) loadProduct();
            isFetchedRef.current = true;
        }
    }, [isEditMode, slug]);

    const handleSizeTypeChange = (e) => {
        setFormData({ ...formData, SizeType: e.target.value, Sizes: [] }); // Reset sizes on type change
    };

    const handleSizeChange = (size) => {
        setFormData((prevData) => {
            const newSizes = prevData.Sizes.includes(size)
                ? prevData.Sizes.filter((s) => s !== size)
                : [...prevData.Sizes, size];

            return { ...prevData, Sizes: newSizes };
        });
    };

    const clothingSizes = Object.values(AllSize.Clothing);
    const ShoeSizes = Object.values(AllSize.Shoes);
    const sizeTypes = Object.keys(AllSize);
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryInputChange = async (e) => {
        const { value } = e.target;
        setFormData({ ...formData, CategoryId: value, SubcategoryId: '' });

        if (value) {
            try {
                const response = await getAllSubCategoriesByCategoryId(value);
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
        if (file && file.type.startsWith('image/')) previewFile(file);
        else alert('Please upload a valid image file.');
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            setFormData((prevData) => ({ ...prevData, Product_image: reader.result }));
        };
    };
    const handleSubmitFile = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        try {
            const formPayload = new FormData(); // Initialize FormData
    
           
    
            // Call appropriate API based on edit mode
            if (isEditMode) {
                await updateProduct(slug, formData);
                console.log('Product updated successfully');
            } else {
                debugger
                await addProduct(formData);
                console.log('Product created successfully');
            }
    
            // Navigate to product listing page on success
            navigate('/admin/Products');
        } catch (err) {
            console.error('Error submitting form:', err);
    
            // Display error message to user
            alert('Failed to submit the form. Please try again.');
        }
    };
    
    const handleCancel = () => navigate('/admin/Products');

    return (
        <div>
            <div className="pagetitle">
                {isEditMode ? 'Edit Product' : 'Create a New Product'}
            </div>
            <div className="form-800">
                <div className="white-bg">
                    <form onSubmit={handleSubmitFile}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="formlabel">Name</div>
                                        <input
                                            type="text"
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">Slug</div>
                                        <input
                                            type="text"
                                            name="Slug"
                                            value={formData.Slug}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="formlabel">Price</div>
                                        <input
                                            type="number"
                                            name="Price"
                                            value={formData.Price}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">Quantity</div>
                                        <input
                                            type="number"
                                            name="Quantity"
                                            value={formData.Quantity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="formlabel">SKU</div>
                                        <input
                                            type="text"
                                            name="SKU"
                                            value={formData.SKU}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">Brand</div>
                                        <input
                                            type="text"
                                            name="Brand"
                                            value={formData.Brand}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <div className="formlabel">Description</div>
                                        <textarea
                                            name="Description"
                                            value={formData.Description}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="formlabel">Category</div>
                                        <select
                                            name="CategoryId"
                                            value={formData.CategoryId}
                                            onChange={handleCategoryInputChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <div className="formlabel">Subcategory</div>
                                        <select
                                            name="SubcategoryId"
                                            value={formData.SubcategoryId}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Subcategory</option>
                                            {subcategories.map((sub) => (
                                                <option key={sub._id} value={sub._id}>
                                                    {sub.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="formlabel">Tags</div>
                                        <input
                                            type="text"
                                            name="Tags"
                                            value={formData.Tags}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">Product Image</div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            required={!isEditMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {previewSource && (
                                            <img 
                                                src={previewSource} 
                                                alt="Product Preview" 
                                                style={{ maxWidth: '100%', height: 'auto' }} 
                                            />
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="formlabel">Size Type</div>
                                        <select 
                                            name="SizeType"
                                            value={formData.SizeType}
                                            onChange={handleSizeTypeChange}
                                            required
                                        >
                                            <option value="">Select Size Type</option>
                                            {sizeTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <div className="formlabel">Sizes</div>
                                        <div>
                                            {formData.SizeType === 'Clothing' && clothingSizes.map(size => (
                                                <label key={size}>
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.Sizes.includes(size)}
                                                        onChange={() => handleSizeChange(size)}
                                                    />
                                                    {size}
                                                </label>
                                            ))}
                                            {formData.SizeType === 'Shoes' && ShoeSizes.map(size => (
                                                <label key={size}>
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.Sizes.includes(size)}
                                                        onChange={() => handleSizeChange(size)}
                                                    />
                                                    {size}
                                                </label>
                                            ))}
                                          
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="form-buttons">
                            <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
                            <button type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
