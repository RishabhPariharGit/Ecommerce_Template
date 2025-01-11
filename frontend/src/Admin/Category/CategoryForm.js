import React, { useState, useEffect, useRef } from 'react';
import { addCategory, updateCategory, getCategoryBySlug } from '../../Services/CategoryService';
import '../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../AdminComponents/Navbar';

const CategoryForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Slug: '',
        label_image: '',
        Status:''
    });
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const isFetchedRef = useRef(false); // Track if data has already been fetched

    // Load category data if in edit mode
    useEffect(() => {
        if (!isFetchedRef.current) {
            const loadCategory = async () => {
                try {
                    const response = await getCategoryBySlug(slug);
                    const category = response.data;
                    setFormData({
                        Name: category.Name,
                        Description: category.Description,
                        Slug: category.Slug,
                        label_image: category.label_image,
                        Status: category.Status

                    });
                } catch (err) {
                    console.error('Error fetching category:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            if (isEditMode && slug) {
                loadCategory();
            } else {
                setIsLoading(false);
            }

            isFetchedRef.current = true; // Mark data as fetched
        }
    }, [isEditMode, slug]);

    const handleInputChange = (e) => {
        debugger
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        navigate('/admin/Category');
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
        
        try {
            const formPayload = new FormData();
            formPayload.append('Name', formData.Name);
            formPayload.append('Description', formData.Description);
            formPayload.append('Slug', formData.Slug);
            formPayload.append('Status', formData.Status);


            if (formData.label_image) {
                formPayload.append('label_image', formData.label_image);
            } else {
                formPayload.append('label_image', '');
            }

            if (isEditMode) {
                await updateCategory(slug, formPayload);
                console.log('Category updated successfully');
            } else {
                await addCategory(formPayload);
                console.log('Category created successfully');
            }
            navigate('/admin/Category');
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar/>
            <div className="white-bg-btn">
            <div className='title-bread-crumbs'>
               <p>Create Category</p> 
               </div>
            </div>
            {/* <div className="pagetitle">{isEditMode ? 'Edit Category' : 'Create a New Category'}</div> */}
            <div className="form-800">
                <div className="white-bg">
                    <div className='input-form'>
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
                                                disabled={isEditMode}
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
                                            <div className="formlabel">Image</div>
                                            <input
                                                type="file"
                                                name="label_image"
                                                onChange={handleFileInputChange}
                                                required={!isEditMode}
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
                                            {(previewSource || (isEditMode && formData.label_image)) && (
                                                <img
                                                    src={previewSource || formData.label_image}
                                                    alt="Selected"
                                                    style={{ height: '180px' }}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                    <tr>

                                        <td>
                                            <div >
                                                <button type="submit" className="button">
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

                    </div>


                </div>

            </div>
        </div>
    );
};

export default CategoryForm;
