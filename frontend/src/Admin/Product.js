import React, { useState, useEffect } from 'react';
import { addProduct, getAllCategories, getAllSubCategoriesByCategoryId } from '../Services/CategoryService';
import './AdminStyle/AdminGlobalStyle.css'

const Product = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
       
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCategoryInputChange = async (e) => {
        debugger
        const { value } = e.target;
        setFormData({
            ...formData,
            CategoryId: value,
            SubcategoryId: ''
        });

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
            setFormData({ ...formData, Product_image: reader.result });
        };
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        try {
            const response = await addProduct(formData);
            console.log('Product created successfully:', response.data.product);
        } catch (err) {
            console.error('Error creating product:', err);
        }
    };

    return (
        <div >
            <div class="pagetitle">Create New Product </div>
            <div className='form-800'>
                <div className='white-bg'>
                    <div className="input-form">
                        <div className='sectionheader'>Create a New Product</div>
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
                                                placeholder="Tags (comma separated)"
                                                value={formData.Tags}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <div className='formlabel'>Image</div>
                                            <input
                                                type="file"
                                                name="Product_image"
                                                onChange={handleFileInputChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className='text-center'>
                                            <button type="submit" className="button">Submit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        {previewSource && (
                            <img src={previewSource} alt="Selected" style={{ height: '300px', marginTop: '20px' }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
