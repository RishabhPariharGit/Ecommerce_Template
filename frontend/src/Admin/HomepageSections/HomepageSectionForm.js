import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProducts } from '../../Services/ProductService';
import { getAllCategories } from '../../Services/CategoryService';
import { getAllSubCategories } from '../../Services/SubCategoryService';
import { addsection,getSectionById,updateSection } from '../../Services/HomepageSectionService';

import axios from 'axios';
import '../AdminStyle/AdminGlobalStyle.css';
import Navbar from '../AdminComponents/Navbar';

const HomepageSectionForm = ({ isEditMode = false }) => {
    debugger
    const [formData, setFormData] = useState({
        Title: '',
        SectionType: 'Product', // Default to 'Product'
        Items: [],
        DisplayOrder: '',
        Status: 'Active'
    });
    const [availableItems, setAvailableItems] = useState({ Product: [], Category: [], Subcategory: [] });
    const [isLoading, setIsLoading] = useState(false);
    const isFetchedRef = useRef(false);
    const navigate = useNavigate();
    const { sectionId } = useParams(); // Use to load the section in edit mode if needed



    useEffect(() => {
        if (!isFetchedRef.current) {
            console.log("item1")
            const fetchItems = async () => {
                debugger
                try {
                    const products = await getAllProducts();
                    const categories = await getAllCategories();
                    const subcategories = await getAllSubCategories();

                    setAvailableItems({
                        Product: products.data,
                        Category: categories.data,
                        Subcategory: subcategories.data,
                    });
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            };
            const fetchSectiondata = async () => {
                console.log("item2")
                debugger
                try {
                    const response = await getSectionById(sectionId);
                    const Section = response.data;
                    setFormData({
                        Title: Section.Title,
                        SectionType: Section.SectionType,
                        Items: Section.Items,
                        DisplayOrder: Section.DisplayOrder,
                        Status:Section.Status
                    });
                } catch (err) {
                    console.error('Error fetching category:', err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchItems();
            // Trigger fetch only if data hasn't been fetched before

            if (isEditMode && sectionId) {
                fetchSectiondata();
            } else {
                setIsLoading(false);
            }

            isFetchedRef.current = true; // Mark data as fetched
        }
    }, [isEditMode, sectionId]);

    const handleChange = (e) => {
        debugger
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
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
        debugger
        event.preventDefault();
        setIsLoading(true);
        const sectionData = { ...formData };

        try {
            if (isEditMode) {
                const response = await updateSection(sectionId,sectionData); // Edit section
                console.log('Section updated successfully:', response.data);
                if(response.status==200){
                    navigate('/admin/HomepageSections');
                }
            } else {
                const response = await addsection(sectionData);// Create new section
                console.log('Section created successfully:', response.data);
            }
            navigate('/admin/HomepageSections');
        } catch (error) {
            console.error('Error saving section:', error);
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
                                        <div className="formlabel">Section Type</div>
                                        <select
                                            name="SectionType"
                                            value={formData.SectionType}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="Product">Product</option>
                                            <option value="Category">Category</option>
                                            <option value="Subcategory">Subcategory</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
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
                                {!isEditMode && (
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
