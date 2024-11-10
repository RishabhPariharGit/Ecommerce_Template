import React, { useState, useEffect, useRef } from 'react';
import { getAllCategories } from '../../Services/CategoryService';
import {
    addSubCategory,
    updatesubCategory,
    getSubCategoryBySlug
} from '../../Services/SubCategoryService';
import '../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';

const SubCategoryForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Slug: '',
        label_image: '',
        CategoryId: ''
    });
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const isFetchedRef = useRef(false); // Track if data has already been fetched

    // Fetch subcategory and category data only once
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
            const fetchData = async () => {
                
                try {
                    if (isEditMode && slug && !isFetchedRef.current) {
                        const response = await getSubCategoryBySlug(slug);
                        const category = response.data;
                        setFormData({
                            Name: category.Name,
                            Description: category.Description,
                            Slug: category.Slug,
                            label_image: category.label_image,
                            CategoryId: category.CategoryId || ''
                        });
                        setPreviewSource(category.label_image);
                        isFetchedRef.current = true; // Mark as fetched after successful data load
                    }

                   
                } catch (err) {
                    console.error('Error fetching category:', err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCategories();
            // Trigger fetch only if data hasn't been fetched before

            if (isEditMode && slug) {
                fetchData();
            } else {
                setIsLoading(false);
            }

            isFetchedRef.current = true; // Mark data as fetched
        }
    }, [isEditMode, slug]);

    const handleInputChange = (e) => {
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
            setFormData((prevData) => ({ ...prevData, label_image: reader.result }));
        };
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (!formData.CategoryId) {
            alert('Please select a category.');
            return;
        }

        try {
            const formPayload = new FormData();
            formPayload.append('Name', formData.Name);
            formPayload.append('Description', formData.Description);
            formPayload.append('Slug', formData.Slug);
            formPayload.append('label_image', formData.label_image);
            formPayload.append('CategoryId', formData.CategoryId);

            const response = isEditMode
                ? await updatesubCategory(slug, formPayload)
                : await addSubCategory(formPayload);

            console.log(`${isEditMode ? 'Updated' : 'Created'} successfully:`, response.data);
            navigate('/admin/SubCategory');
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Failed to submit the form. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/admin/SubCategory');
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="pagetitle">
                {isEditMode ? 'Edit Subcategory' : 'Create a New Subcategory'}
            </div>
            <div className="form-800">
                <div className="white-bg">
                    <div className="input-form">
                        <div className="sectionheader">
                            {isEditMode ? 'Edit Subcategory' : 'Create a New Subcategory'}
                        </div>
                        <form onSubmit={handleSubmitFile}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="formlabel">Name</div>
                                            <input
                                                type="text"
                                                name="Name"
                                                placeholder="Subcategory Name"
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
                                                placeholder="Slug"
                                                value={formData.Slug}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isEditMode}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Description</div>
                                            <textarea
                                                name="Description"
                                                placeholder="Subcategory Description"
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
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="formlabel">Image</div>
                                            <input
                                                type="file"
                                                name="label_image"
                                                onChange={handleFileInputChange}
                                                required={!isEditMode}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="button"
                                                    disabled={isLoading}
                                                >
                                                    {isEditMode ? 'Update' : 'Submit'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="button cancel-button"
                                                    onClick={handleCancel}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        {(previewSource || (isEditMode && formData.label_image)) && (
                            <img
                                src={previewSource || formData.label_image}
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

export default SubCategoryForm;
