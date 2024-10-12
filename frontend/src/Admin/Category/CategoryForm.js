import React, { useState, useEffect } from 'react';
import { addCategory, updateCategory, getCategoryBySlug } from '../../Services/CategoryService'; // Import update and get services
import '../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and getting slug from URL

const CategoryForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Slug: '',
        label_image: ''
    });
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const { slug } = useParams(); // Get the slug from URL in case of editing
    const navigate = useNavigate();

    // Load category data if in edit mode
    useEffect(() => {
        if (isEditMode && slug) {
            const loadCategory = async () => {
                debugger
                try {
                    const response = await getCategoryBySlug(slug); // Fetch category by slug
                    const category = response.data;
                    setFormData({
                        Name: category.Name,
                        Description: category.Description,
                        Slug: category.Slug,
                        label_image: category.label_image // Use existing image URL for edit
                    });
                    setIsLoading(false); // Stop loading once data is fetched
                } catch (err) {
                    console.error('Error fetching category:', err);
                    setIsLoading(false); // Stop loading even on error
                }
            };
            loadCategory();
        } else {
            setIsLoading(false); // If not in edit mode, stop loading immediately
        }
    }, [isEditMode, slug]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleCancel = () => {
        navigate('/admin/Category'); // Redirect back to the category list
    };
    const handleFileInputChange = (e) => {
        debugger
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
            setFormData({ ...formData, label_image: reader.result });
        };
    };
    const handleSubmitFile = async (e) => {
        debugger
        e.preventDefault(); // Prevent form refresh
    
        try {
            const formPayload = new FormData(); // Use FormData to handle file upload
            formPayload.append('Name', formData.Name);
            formPayload.append('Description', formData.Description);
            formPayload.append('Slug', formData.Slug);
    
            // Always append label_image, either as a file or as an empty string if no file is selected
            if (formData.label_image) {
                formPayload.append('label_image', formData.label_image);// Append the new image file
            } else {
                formPayload.append('label_image', ''); // Append an empty string if no new image
            }
    
            if (isEditMode) {
                const response = await updateCategory(slug, formPayload); // Pass FormData for updating
                console.log('Category updated successfully:', response.data);
            } else {
                const response = await addCategory(formPayload);
                console.log('Category created successfully:', response.data);
            }
            navigate('/admin/Category'); // Redirect back to the category list after success
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };
    
    if (isLoading) {
        return <div>Loading...</div>; // Render loading state while data is being fetched
    }

    return (
        <div>
            <div className="pagetitle">{isEditMode ? 'Edit Category' : 'Create a New Category'}</div>
            <div className='form-800'>
                <div className='white-bg'>
                    <div className="input-form">
                        <div className='sectionheader'>{isEditMode ? 'Edit Category' : 'Create a New Category'}</div>
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
                                                    placeholder="Category Name"
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
                                                    placeholder="Category Description"
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
                                src={previewSource || (isEditMode ? formData.label_image : '')}  // Show preview or existing image URL
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

export default CategoryForm;
