import React, { useState, useEffect, useRef } from 'react';
import { getAllCategories } from '../../Services/CategoryService';
import {
    addProduct,
    updateProduct,
    getProductBySlug
} from '../../Services/ProductService';
import { getAllSubCategoriesByCategoryId,getAllSubCategories } from '../../Services/SubCategoryService';
import '../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import AllSize from './EnumDropdown'; // Import the enum


const ProductForm = ({ isEditMode = false }) => {
    const [previewSources, setPreviewSources] = useState([]); // Array for preview
    const [SinglepreviewSource, setSinglepreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Price: '',
        Quantity: '',
        CategoryId: '',
        SubcategoryId: '',
        Product_image: [],
        Product_Main_image: '',
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
            const fetchSubCategories = async () => {
                try {
                    const response = await getAllSubCategories();
                    setSubcategories(response.data);
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
                            Product_image: product.Product_image || [],
                            Product_Main_image: product.Product_Main_image,
                            SizeType: product.SizeType || '',
                            Sizes: product.Sizes || [] ,// Assuming product.Sizes is an array
                            Status: product.Status

                        });
                        setPreviewSources(product.Product_image || []);
                        setSinglepreviewSource(product.Product_Main_image);

                    }
                } catch (err) {
                    console.error('Error fetching product:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCategories();
            fetchSubCategories();
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
    const handleRemoveImage = (index, event) => {
        event.preventDefault();
        setPreviewSources((prevSources) => prevSources.filter((_, i) => i !== index));
        setFormData((prevData) => ({
            ...prevData,
            Product_image: prevData.Product_image.filter((_, i) => i !== index)
        }));
    };


    const clothingSizes = Object.values(AllSize.Clothing);
    const ShoeSizes = Object.values(AllSize.Shoes);
    const sizeTypes = Object.keys(AllSize);

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files); // Convert file list to an array
        const newBase64Strings = []; // Hold new base64 strings for the current selection

        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                newBase64Strings.push(reader.result);

                // Once all files are processed, update the state
                if (newBase64Strings.length === files.length) {
                    setPreviewSources((prevSources) => [...prevSources, ...newBase64Strings]); // Append previews
                    setFormData((prevData) => ({
                        ...prevData,
                        Product_image: [...(prevData.Product_image || []), ...newBase64Strings] // Append new images to existing ones as an array
                    }));
                }
            };
        });
    };

    const handleSingleFileInputChange = (e) => {
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
            setSinglepreviewSource(reader.result);
            setFormData((prevData) => ({ ...prevData, Product_Main_image: reader.result }));
        };
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
           
            <div className="white-bg-btn">
            <div className='title-bread-crumbs'>
               <p>Create Product</p> 
               </div>
            </div>
            {/* <div className="pagetitle">
                {isEditMode ? 'Edit Product' : 'Create a New Product'}
            </div> */}
            <div className="form-800">
                <div className="white-bg">
                    <form onSubmit={handleSubmitFile}>
                        <table>
                            <tbody>
                                {/* Product Name and Slug */}
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

                                {/* Price and Quantity */}
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

                                {/* SKU and Brand */}
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

                                {/* Description */}
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

                                {/* Category and Subcategory */}
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
                                {/* Size Type and Sizes */}
                                <tr>
                                    <td>
                                        <div className="formlabel">Size Type</div>
                                        <select
                                            name="SizeType"
                                            value={formData.SizeType}
                                            onChange={handleSizeTypeChange}
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
                                        {formData.SizeType === 'Clothing' &&
                                            clothingSizes.map((size) => (
                                                <label key={size}>
                                                    <input
                                                        type="checkbox"
                                                        value={size}
                                                        checked={formData.Sizes.includes(size)}
                                                        onChange={() => handleSizeChange(size)}
                                                    />
                                                    {size}
                                                </label>
                                            ))}
                                        {formData.SizeType === 'Shoes' &&
                                            ShoeSizes.map((size) => (
                                                <label key={size}>
                                                    <input
                                                        type="checkbox"
                                                        value={size}
                                                        checked={formData.Sizes.includes(size)}
                                                        onChange={() => handleSizeChange(size)}
                                                    />
                                                    {size}
                                                </label>
                                            ))}
                                    </td>
                                </tr>
                                {/* Tags and Product Image */}
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
                                        <div className="formlabel">Main Product Image</div>
                                        <input
                                            type="file"
                                            name="label_image"
                                            onChange={handleSingleFileInputChange}
                                            required={!isEditMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                {isEditMode && (
                                            <td>
                                                 <label htmlFor="status">Status:</label>
                                                <select
                                                    name="Status"
                                                    value={formData.Status}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </td>
                                        )}
                                </tr>
                                <tr>
                                    <td>
                                        <div className="formlabel">Product Images</div>
                                        <input
                                            type="file"
                                            name="Product_image"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            multiple
                                        />
                                         {/* Preview Image Section */}
                                    <div className="image-preview-section">
                                        {previewSources && previewSources.length > 0 ? (
                                            previewSources.map((source, index) => (
                                                <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                                                    <img
                                                        src={source}
                                                        alt={`Preview ${index + 1}`}
                                                        style={{ maxWidth: '100px' }}
                                                    />
                                                    <button
                                                        onClick={(event) => handleRemoveImage(index, event)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '0',
                                                            right: '0',
                                                            background: 'red',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '50%',
                                                            cursor: 'pointer',
                                                            padding: '2px 5px'
                                                        }}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No images available</p>
                                        )}
                                    </div>
                                    </td>

                                    <td>
                                        {(SinglepreviewSource || (isEditMode && formData.label_image)) && (
                                            <img
                                                src={SinglepreviewSource || formData.label_image}
                                                alt="Selected"
                                                style={{ height: '145px', marginTop: '20px' }}
                                            />
                                        )}
                                    </td>
                                </tr>
                               
                                <tr>
                                    <td>
                                        <div>
                                            <button type="submit" className="button">
                                                {isEditMode ? 'Update Product' : 'Create Product'}
                                            </button>
                                            <button type="button"
                                                className="button cancel-button"
                                                onClick={handleCancel}>
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>







                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
