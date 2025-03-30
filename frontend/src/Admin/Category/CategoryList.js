import React, { useState, useEffect, useRef } from 'react';
import { getAllCategories, deleteCategory } from '../../Services/CategoryService'; // Import deleteCategory
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); // Initialize navigate
    const isFetchedRef = useRef(false); // Track if data has already been fetched
    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchCategories = async () => {
                try {
                    debugger
                    const response = await getAllCategories();
                    if (response && response.data) {
                        setCategories(response.data);
                    } else {
                        setCategories([]); // Ensure categories is always an array
                    }
                } catch (err) {
                    console.error('Error fetching categories:', err);
                }
            };

            fetchCategories();
            isFetchedRef.current = true;
        }
    }, []);

    const handleEdit = (categorySlug) => {
        // Navigate to the edit page with the category slug
        navigate(`/admin/Category/edit/${categorySlug}`);
    };

    const handleCreate = () => {
        // Navigate to the create page
        navigate('/admin/Category/create');
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category? This will also delete all related subcategories and products.")) {
            try {
                await deleteCategory(categoryId); // Call the delete function
                setCategories(categories.filter(category => category._id !== categoryId)); // Remove the deleted category from state
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    return (
        <>
            <div className="white-bg-btn">
                <div className='title-bread-crumbs'>
                    <p>Categories</p>
                </div>
                <button className="button" onClick={handleCreate}>
                    Create Category
                </button>

            </div>

            <div className="form-600">
                <div className="white-bg">
                    <table className="tablestyle">
                        <thead>
                            <tr className="roundheader">
                                <th>Name</th>
                                <th>Description</th>
                                <th className="buttoncolumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(categories) && categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category.Slug}>
                                        <td>{category.Name}</td>
                                        <td>{category.Description}</td>
                                        <td>
                                            <div className='customization-main-btns'>
                                                <button
                                                    className="gridbutton"
                                                    onClick={() => handleEdit(category.Slug)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="gridbutton delete-button"
                                                    onClick={() => handleDelete(category._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No categories found</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

        </>
    );
};

export default CategoryList;
