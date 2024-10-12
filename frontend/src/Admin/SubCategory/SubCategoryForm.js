import React, { useState, useEffect } from 'react';
import { addSubCategory, updatesubCategory, getSubCategoryBySlug, getAllCategories } from '../../Services/CategoryService';
import '../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';

const SubCategoryForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Slug: '',
        label_image: '',
        CategoryId: '' // Initialize CategoryId to an empty string
    });
    const [categories, setCategories] = useState([]); // Store categories
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { slug } = useParams(); // Get the slug from URL
    const navigate = useNavigate();

    // Load category data if in edit mode
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isEditMode && slug) {
                    // Fetch subcategory by slug for editing
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
                }
                
                // Fetch all categories (both in edit and non-edit mode)
                const categoryResponse = await getAllCategories();
                setCategories(categoryResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData(); // Call combined function once on component mount
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
    const handleCancel = () => {
        navigate('/admin/SubCategory'); // Redirect back to the category list
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            setFormData((prevData) => ({ ...prevData, label_image: reader.result })); // Store base64 image
        };
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault(); // Prevent form refresh

        try {
            const formPayload = new FormData(); // Use FormData to handle file upload
            formPayload.append('Name', formData.Name);
            formPayload.append('Description', formData.Description);
            formPayload.append('Slug', formData.Slug);
            formPayload.append('label_image', formData.label_image); // Always append label_image
            formPayload.append('CategoryId', formData.CategoryId);
            if (isEditMode) {
                const response = await updatesubCategory(slug, formPayload); // Pass FormData for updating
                console.log('Subcategory updated successfully:', response.data);
            } else {
                const response = await addSubCategory(formPayload); // Create a new category
                console.log('Subcategory created successfully:', response.data);
            }
            navigate('/admin/SubCategory'); // Redirect back to the category list after success
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Failed to submit the form. Please try again.'); // Alert on failure
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Render loading state while data is being fetched
    }

    return (
        <div>
            <div className="pagetitle">{isEditMode ? 'Edit Subcategory' : 'Create a New Subcategory'}</div>
            <div className='form-800'>
                <div className='white-bg'>
                    <div className="input-form">
                        <div className='sectionheader'>{isEditMode ? 'Edit Subcategory' : 'Create a New Subcategory'}</div>
                        <form onSubmit={handleSubmitFile}>
                            <table>
                                <tbody>
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
                                                    disabled={isEditMode} // Disable slug editing in edit mode
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
                                            <div className='formlabel'>Category</div>
                                            <div>
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
                                                    required={!isEditMode} // Require image upload only in add mode
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='text-center'>
                                                <button type="submit" className="button">
                                                    {isEditMode ? 'Update' : 'Submit'}
                                                </button>
                                                <button type="button" className="button cancel-button" onClick={handleCancel}>
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
                                src={previewSource || formData.label_image}  // Show preview or existing image URL
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

export default SubCategoryForm; // Ensure you export the correct component
