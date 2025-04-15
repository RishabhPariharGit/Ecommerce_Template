import React, { useState, useEffect, useRef } from 'react';
import { getAllCategories } from '../../../Services/AdminServices/Allservices/CategoryService';

import {
    addProduct,
    updateProduct,
    getProductBySlug
} from '../../../Services/AdminServices/Allservices/ProductService';
import { getAllSubCategoriesByCategoryId, getAllSubCategories } from '../../../Services/AdminServices/Allservices/SubCategoryService';
import '../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import AllSize from './EnumDropdown';


const ProductForm = ({ isEditMode = false }) => {
    const [previewSources, setPreviewSources] = useState([]);
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
        Gender: '',
        Sizes: []
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const isFetchedRef = useRef(false);


    useEffect(() => {

        if (!isFetchedRef.current) {

            const fetchCategories = async () => {
                try {
                    const response = await getAllCategories();
                    if (response) {
                        setCategories(response.data);

                    } else {
                        setCategories([]);
                    }
                } catch (err) {
                    console.error('Error fetching categories:', err);
                }
            };
            const fetchSubCategories = async () => {
                try {
                    const response = await getAllSubCategories();
                    if (response) {
                        setSubcategories(response.data);
                    }
                    else {
                        setSubcategories([]);
                    }
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
                            Sizes: product.Sizes || [],
                            Gender: product.Gender,
                            Status: product.audit.status

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


    const handleRemoveImage = (index, event) => {
        event.preventDefault();
        setPreviewSources((prevSources) => prevSources.filter((_, i) => i !== index));
        setFormData((prevData) => ({
            ...prevData,
            Product_image: prevData.Product_image.filter((_, i) => i !== index)
        }));
    };


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
                if (response) {
                    setSubcategories(response.data);
                } else {
                    setSubcategories([]);
                }

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

        e.preventDefault();

        try {
            let response;
            if (isEditMode) {
                response = await updateProduct(slug, formData);
            } else {
                response = await addProduct(formData);
            }
            if (response) {
                alert(response.message);
            }
            navigate('/admin/Products');
        } catch (err) {
            console.error('Error submitting form:', err);

            alert('Failed to submit the form. Please try again.');
        }
    };

    const handleCancel = () => navigate('/admin/Products');


    const handleSizeChange = (type, size) => {
        const fullSize = `${type}-${size}`; // e.g., 'W-30' or 'L-30'

        setFormData((prevData) => {
            const newSizes = prevData.Sizes.includes(fullSize)
                ? prevData.Sizes.filter((s) => s !== fullSize)
                : [...prevData.Sizes, fullSize];

            return { ...prevData, Sizes: newSizes };
        });
    };

    const handleSize = (size) => {
        setFormData((prevData) => {
            const newSizes = prevData.Sizes.includes(size)
                ? prevData.Sizes.filter((s) => s !== size)
                : [...prevData.Sizes, size];

            return { ...prevData, Sizes: newSizes };
        });
    };

    const genderOptions = ['Men', 'Women', 'Kids'];

    // Filter available size types based on the selected gender and size type
    const availableSizeTypes = Object.keys(AllSize).filter((type) =>
        formData.Gender && AllSize[type][formData.Gender]
    );

    // Get available sizes based on selected size type and gender
    const availableSizes = formData.SizeType && formData.Gender
        ? AllSize[formData.SizeType][formData.Gender] || []
        : [];

    // For Pants, split Waist and Length if necessary
    const pantsSizes = formData.SizeType === 'Pants' && formData.Gender ? AllSize.Pants[formData.Gender] : {};
    const availableWaistSizes = pantsSizes.Waist || [];
    const availableLengthSizes = pantsSizes.Length || [];


    return (
        <div>


            <div className='pagetitle'>
                {isEditMode ? 'Edit Product' : 'Create a New Product'}
            </div>


            <div className="form-1000">
                <div className="white-bg">
                    <div className="input-form">
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
                                        <td >
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
                                                {Array.isArray(categories) && categories.map((cat) => (
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
                                                {Array.isArray(subcategories) && subcategories.map((sub) => (
                                                    <option key={sub._id} value={sub._id}>
                                                        {sub.Name}
                                                    </option>
                                                ))}

                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="formlabel">Gender</div>
                                            <select name="Gender" value={formData.Gender} onChange={handleInputChange}>
                                                <option value="">Select Gender</option>
                                                {genderOptions.map((gender) => (
                                                    <option key={gender} value={gender}>{gender}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    {/* Size Type and Sizes */}
                                    <tr>
                                        <td>
                                            <div className="formlabel">Size Type</div>
                                            <select name="SizeType" value={formData.SizeType} onChange={handleInputChange} disabled={!formData.Gender}>
                                                <option value="">Select Size Type</option>
                                                {availableSizeTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <div className="formlabel">Sizes</div>
                                            {formData.SizeType === 'Pants' && formData.Gender ? (
                                                <div>
                                                    <div><strong>Waist Sizes</strong></div>
                                                    {availableWaistSizes.length > 0 ? (
                                                        availableWaistSizes.map((size) => (
                                                            <label key={size}>
                                                                <input
                                                                    type="checkbox"
                                                                    value={`W-${size}`}
                                                                    checked={formData.Sizes.includes(`W-${size}`)}
                                                                    onChange={() => handleSizeChange('W', size)} // ✅ add 'W'
                                                                />

                                                                {size}
                                                            </label>
                                                        ))
                                                    ) : (
                                                        <div style={{ color: '#888' }}>Select gender and size type to see waist sizes</div>
                                                    )}

                                                    <div><strong>Length Sizes</strong></div>
                                                    {availableLengthSizes.length > 0 ? (
                                                        availableLengthSizes.map((size) => (
                                                            <label key={size}>
                                                                <input
                                                                    type="checkbox"
                                                                    value={`L-${size}`}
                                                                    checked={formData.Sizes.includes(`L-${size}`)}
                                                                    onChange={() => handleSizeChange('L', size)} // ✅ add 'L'
                                                                />

                                                                {size}
                                                            </label>
                                                        ))
                                                    ) : (
                                                        <div style={{ color: '#888' }}>Select gender and size type to see length sizes</div>
                                                    )}
                                                </div>
                                            ) : (
                                                availableSizes.length > 0 ? (
                                                    availableSizes.map((size) => (
                                                        <label key={size}>
                                                            <input
                                                                type="checkbox"
                                                                value={size}
                                                                checked={formData.Sizes.includes(size)}
                                                                onChange={() => handleSize(size)}
                                                            />
                                                            {size}
                                                        </label>
                                                    ))
                                                ) : (
                                                    <div style={{ color: '#888' }}>Select gender and size type to see sizes</div>
                                                )
                                            )}
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
                                            <div className="formlabel">Main Product Image</div>
                                            <input
                                                type="file"
                                                name="label_image"
                                                onChange={handleSingleFileInputChange}
                                                required={!isEditMode}
                                            />
                                            {(SinglepreviewSource || (isEditMode && formData.label_image)) && (
                                                <img
                                                    src={SinglepreviewSource || formData.label_image}
                                                    alt="Selected"
                                                    style={{ height: '145px', marginTop: '20px' }}
                                                />
                                            )}
                                        </td>

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
                                    </tr>
                                    

                                    <tr>
                                        <td>
                                            <div >
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
        </div>
    );
};

export default ProductForm;
