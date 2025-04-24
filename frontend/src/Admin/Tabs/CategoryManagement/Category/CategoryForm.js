import React, { useState, useEffect, useRef } from 'react';
import { addCategory, updateCategory, getCategoryBySlug } from '../../../../Services/AdminServices/Allservices/CategoryService';
import '../../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const CategoryForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Slug: '',
        label_image: '',
        Status: '',
        Show_In_Nav: false
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

                    if (!response.data) {
                        toast.error(response.message);
                        // Handle error state here, e.g., show a message or redirect
                        return;
                    }
                    const category = response.data;
                    setFormData({
                        Name: category.Name,
                        Description: category.Description,
                        Slug: category.Slug,
                        label_image: category.label_image,
                        Show_In_Nav: category.Show_In_Nav,
                        Status: category.audit.status
                    });
                } catch (err) {
                    toast.error('Error fetching category:', err);
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
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCancel = () => {
        navigate('/admin/Category');
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            previewFile(file);
        } else {
            toast.error('Please upload a valid image file.');
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
        debugger
        try {
            let response;
            if (isEditMode) {
                response = await updateCategory(slug, formData);
            } else {
                response = await addCategory(formData);
            }

            if (response && response.data) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/admin/Category');
                }, 3500); // Wait for 2 seconds so user sees the toast
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error('Error submitting form:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>


            <div className='pagetitle'>
                Create Category
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
                                            <div className='pt-2'>
                                                {(previewSource || (isEditMode && formData.label_image)) && (
                                                    <img
                                                        src={previewSource || formData.label_image}
                                                        alt="Selected"
                                                        style={{ height: '180px' }}
                                                    />
                                                )}
                                            </div>

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
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="Show_In_Nav"
                                                    checked={formData.Show_In_Nav}
                                                    onChange={handleInputChange}
                                                />

                                                <span className="formlabel pl-10 ">Show In Navbar</span>
                                            </div>

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
