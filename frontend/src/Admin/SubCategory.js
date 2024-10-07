import React, { useState, useEffect } from 'react';
import { addSubCategory } from '../Services/CategoryService'; // Update this to addSubCategory service later
import { getAllCategories } from '../Services/CategoryService'; // Service to fetch categories
import './AdminStyle/AdminGlobalStyle.css'

const SubCategory = () => {
    const [categories, setCategories] = useState([]);
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Slug: '',
        label_image: '',
        CategoryId: '' // This will hold the selected category
    });

    // Fetch all categories when the component loads
    useEffect(() => {
        debugger
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(); // Fetch categories from backend
                setCategories(response.data); // Assuming response.data contains categories array
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        debugger
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
            setFormData({ ...formData, label_image: reader.result }); // Store base64 image
        };
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault(); // Prevent form refresh

        try {
            const response = await addSubCategory(formData); // Send the formData directly (replace with addSubCategory)
            console.log('Subcategory created successfully:', response.data.subcategory);
        } catch (err) {
            console.error('Error creating subcategory:', err);
        }
    };

    return (
        <div >
        
            <div className='form-800'>
                <div className='white-bg'>
                    <div className="input-form">
                        <div className='sectionheader'>Create a New Subcategory</div>
                        <form onSubmit={handleSubmitFile}>
                            <table>
                                <tr>
                                    <td>
                                        <div className='formlabel'>Name</div>
                                        <div>
                                            <input
                                                type="text"
                                                name="Name"
                                                placeholder="Subcategory Name"
                                                value={formData.Name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className='formlabel'>Slug</div>
                                        <div>
                                            <input
                                                type="text"
                                                name="Slug"
                                                placeholder="Slug"
                                                value={formData.Slug}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ maxWidth: '1000px' }}>
                                        <div className='formlabel'>Description</div>
                                        <div>
                                            <textarea
                                                name="Description"
                                                placeholder="Subcategory Description"
                                                value={formData.Description}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='formlabel'>Image</div>
                                        <div>
                                            <input
                                                type="file"
                                                name="label_image"
                                                onChange={handleFileInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='formlabel'>Category</div>
                                        <div>
                                            <select
                                                name="CategoryId" // This should match the formData key
                                                value={formData.CategoryId}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.Name}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='text-center'>
                                            <button type="submit" className="button">
                                                Submit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </form>
                        {previewSource && (
                            <img
                                src={previewSource}
                                alt="Selected"
                                style={{ height: '300px', marginTop: '20px' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCategory;
