import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProducts } from '../../Services/ProductService';
import { getAllSubCategories } from '../../Services/SubCategoryService';
import { addsection, getSectionById, updateSection } from '../../Services/HomepageSectionService';

import axios from 'axios';
import '../AdminStyle/AdminGlobalStyle.css';
import Navbar from '../AdminComponents/Navbar';

const HomepageSectionForm = ({ isEditMode = false }) => {
    const [formData, setFormData] = useState({
        Title: '',
        SectionType: '', // Default to 'Product'
        Items: [],
        DisplayOrder: '',
        Status: 'Active',
        isBestSeller: false,
        isFreshArrival: false
    });

    const [availableItems, setAvailableItems] = useState({ Product: [], Category: [], Subcategory: [] });
    const [isLoading, setIsLoading] = useState(false);
    const isFetchedRef = useRef(false);
    const navigate = useNavigate();
    const { sectionId } = useParams(); // Use to load the section in edit mode if needed

    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchItems = async () => {
                try {
                    const products = await getAllProducts();
                    const subcategories = await getAllSubCategories();

                    setAvailableItems({
                        Product: products.data,
                        Subcategory: subcategories.data,
                    });
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            };

            const fetchSectiondata = async () => {
                try {
                    const response = await getSectionById(sectionId);
                    const Section = response.data;
                    setFormData({
                        Title: Section.Title,
                        SectionType: Section.SectionType,
                        Items: Section.Items,
                        DisplayOrder: Section.DisplayOrder,
                        Status: Section.Status,
                        isBestSeller: Section.isBestSeller || false,
                        isFreshArrival: Section.isFreshArrival || false
                    });
                } catch (err) {
                    console.error('Error fetching section:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchItems();

            if (isEditMode && sectionId) {
                fetchSectiondata();
            } else {
                setIsLoading(false);
            }

            isFetchedRef.current = true;
        }
    }, [isEditMode, sectionId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleItemSelection = (itemId) => {
        setFormData((prevData) => {
            const items = prevData.Items.includes(itemId)
                ? prevData.Items.filter((item) => item !== itemId)
                : [...prevData.Items, itemId];
            return { ...prevData, Items: items };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const sectionData = { ...formData };

        try {
            if (isEditMode) {
                const response = await updateSection(sectionId, sectionData); // Edit section
                console.log('Section updated successfully:', response.data);
                if (response.status === 200) {
                    navigate('/admin/HomepageSections');
                }
            } else {
                const response = await addsection(sectionData); // Create new section
                console.log('Section created successfully:', response.data);
            }
            navigate('/admin/HomepageSections');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                const { message, suggestedNextDisplayOrder } = error.response.data;
                alert(`${message}\nSuggested DisplayOrder: ${suggestedNextDisplayOrder}`);
            } else {
                alert('An error occurred while saving the section. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/HomepageSections');
    };

    return (
        <div>
            <Navbar />
            <div className="white-bg-btn">
                <div className="title-bread-crumbs">
                    <p>Homepage Sections Form</p>
                </div>
            </div>
            <div className="form-800">
                <div className="white-bg">
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        {/* Section Title - Always visible */}
                                        <div className="formlabel">Section Title</div>
                                        <input
                                            type="text"
                                            name="Title"
                                            value={formData.Title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        {/* Display Order - Always visible */}
                                        <div className="formlabel">Display Order</div>
                                        <input
                                            type="number"
                                            name="DisplayOrder"
                                            value={formData.DisplayOrder}
                                            onChange={handleChange}
                                            min="0"
                                            required
                                        />
                                    </td>
                                </tr>

                                {/* Remaining fields - Only visible in edit mode */}
                                {isEditMode && (
                                    <>
                                        <tr>
                                            <td>
                                                <div className="formlabel">Section Type</div>
                                                <select
                                                    name="SectionType"
                                                    value={formData.SectionType}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Product">Product</option>
                                                    <option value="Subcategory">Subcategory</option>
                                                </select>
                                            </td>
                                            <td>
                                                <label htmlFor="status">Status:</label>
                                                <select
                                                    name="Status"
                                                    value={formData.Status}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </td>
                                        </tr>



                                        {/* Item Selection */}
                                        <tr>
                                            <td colSpan="2">
                                                <div className="formlabel">Select Items</div>
                                                {availableItems[formData.SectionType]?.map((item) => (
                                                    <div key={item._id}>
                                                        <input
                                                            type="checkbox"
                                                            value={item._id}
                                                            checked={formData.Items.includes(item._id)}
                                                            onChange={() => handleItemSelection(item._id)}
                                                        />
                                                        {item.Name || item.Title}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>

                        </table>
                        <div className="text-center">
                            <button type="submit" className="button" disabled={isLoading}>
                                {isEditMode ? 'Update Section' : 'Create Section'}
                            </button>
                            <button type="button" className="button cancel-button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomepageSectionForm;

