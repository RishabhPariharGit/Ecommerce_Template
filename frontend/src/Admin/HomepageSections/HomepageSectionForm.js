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
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const navigate = useNavigate();
    const { sectionId } = useParams(); // Use to load the section in edit mode if needed
    const [ListLabel, setListLabel] = useState('');
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
                    if (Section.SectionType === "Product") {
                        setListLabel("Product")
                    } else if (Section.SectionType === "Subcategory") {
                        setListLabel("Subcategory")

                    }
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
        if (value === "Product") {
            setListLabel("Product")
        } else if (value === "Subcategory") {
            setListLabel("Subcategory")

        }
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
                                            <td>
                                                <div className="formlabel">Select {ListLabel}</div>

                                                {/* Search Input */}
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Search items..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                                                    />
                                                </div>

                                                {/* Sort Dropdown */}
                                                <div style={{ marginBottom: "10px" }}>
                                                    <label htmlFor="sortOrder" style={{ marginRight: "10px" }}>
                                                        Sort By:
                                                    </label>
                                                    <select
                                                        id="sortOrder"
                                                        value={sortOrder}
                                                        onChange={(e) => setSortOrder(e.target.value)}
                                                        style={{ padding: "5px" }}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="asc">A to Z</option>
                                                        <option value="desc">Z to A</option>
                                                    </select>
                                                </div>

                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Select</th>
                                                            <th>Image</th>
                                                            <th>Item</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {availableItems[formData.SectionType]
                                                            ?.filter((item) =>
                                                                (item.Name || item.Title)
                                                                    ?.toLowerCase()
                                                                    .includes(searchTerm.toLowerCase())
                                                            )
                                                            .sort((a, b) => {
                                                            
                                                                const nameA = (a.Name || a.Title || "").toLowerCase();
                                                                const nameB = (b.Name || b.Title || "").toLowerCase();
                                                                if (sortOrder === "asc") {
                                                                    return nameA.localeCompare(nameB); // A to Z
                                                                } else if (sortOrder === "desc") {
                                                                    return nameB.localeCompare(nameA); // Z to A
                                                                }
                                                                return 0; // Default, no sorting
                                                            })
                                                            .map((item) => (
                                                                <tr key={item._id}>
                                                                    <td>
                                                                        <input
                                                                            type="checkbox"
                                                                            value={item._id}
                                                                            checked={formData.Items.includes(item._id)}
                                                                            onChange={() => handleItemSelection(item._id)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <img
                                                                            src={
                                                                                ListLabel === "Product"
                                                                                    ? item.Product_Main_image
                                                                                    : item.label_image
                                                                            }
                                                                            alt={item.Name || item.Title}
                                                                            style={{
                                                                                width: "50px",
                                                                                height: "50px",
                                                                                objectFit: "cover",
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td>{item.Name || item.Title}</td>
                                                                    <td>{item.Status}</td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
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

