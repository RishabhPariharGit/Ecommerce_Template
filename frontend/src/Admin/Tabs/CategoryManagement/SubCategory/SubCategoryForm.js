import React, { useState, useEffect, useRef } from 'react';
import { getAllCategories } from '../../../../Services/AdminServices/Allservices/CategoryService';
import {
    addSubCategory,
    updatesubCategory,
    getSubCategoryBySlug
} from '../../../../Services/AdminServices/Allservices/SubCategoryService';
import '../../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
const SubCategoryForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Slug: '',
        label_image: '',
        CategoryId: [],
        Status: '',
        ISLandscape :false,
        Show_In_Colletion_Grid:false,
    });
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const isFetchedRef = useRef(false); // Track if data has already been fetched
    const categoryOptions = categories.map(cat => ({
        value: cat._id,
        label: cat.Name
    }));
    const handleCategoryChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setFormData({
            ...formData,
            CategoryId: selectedIds
        });
    };
    // Fetch subcategory and category data only once
    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchCategories = async () => {
                try {
                    const response = await getAllCategories();

                    if (response.data) {
                        setCategories(response.data);
                    } else {
                        setCategories([]);
                        console.warn('No categories found.');
                    }
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
                            CategoryId: category.CategoryId || '',
                            Status: category.audit.status,
                            ISLandscape :category.ISLandscape,
                            Show_In_Colletion_Grid:category.Show_In_Colletion_Grid
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
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
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
        debugger
        e.preventDefault();
        if (!formData.CategoryId) {
            toast.error('Please select a category.');
            return;
        }

        try {
            const response = isEditMode
                ? await updatesubCategory(slug, formData)
                : await addSubCategory(formData);

            if (response && response.data) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/admin/SubCategory');
                }, 3500); // Wait for 2 seconds so user sees the toast
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            toast.error('Failed to submit the form. Please try again.');
        }
    };


    const handleCancel = () => {
        navigate('/admin/SubCategory');
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>


         

            <div className="pagetitle">
                {isEditMode ? 'Edit Subcategory' : 'Create a New Subcategory'}
            </div>
            <div className="form-800">
                <div className="white-bg">
                    <div className="input-form">
                        {/* <div className="sectionheader">
                            {isEditMode ? 'Edit Subcategory' : 'Create a New Subcategory'}
                        </div> */}
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
                                            <Select
                                                isMulti
                                                options={categoryOptions}
                                                value={categoryOptions.filter(option =>
                                                    formData.CategoryId.includes(option.value)
                                                )}
                                                onChange={handleCategoryChange}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                placeholder="Select Categories"
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
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="ISLandscape"
                                                    checked={formData.ISLandscape}
                                                    onChange={handleInputChange}
                                                />

                                                <span className="formlabel pl-10 ">ISLandscape</span>
                                            </div>

                                        </td>
                                        <td>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="Show_In_Colletion_Grid"
                                                    checked={formData.Show_In_Colletion_Grid}
                                                    onChange={handleInputChange}
                                                />

                                                <span className="formlabel pl-10 ">Show In Colletion Grid</span>
                                            </div>

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
                                            {(previewSource || (isEditMode && formData.label_image)) && (
                                                <div>
                                                    <img
                                                        src={previewSource || formData.label_image}
                                                        alt="Selected"
                                                        style={{ height: '300px', marginTop: '20px' }}
                                                    />
                                                </div>

                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <div >
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

                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategoryForm;
