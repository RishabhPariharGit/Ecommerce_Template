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
                const response = await getAllCategories();
                setCategories(response.data); 
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
        <div>
            <div className="pagetitle">
                Categories
            </div>
            <div className="form-600">
                <div className="white-bg">
                    <button className="button" onClick={handleCreate}>
                        Create Category
                    </button>
                    <table className="tablestyle">
                        <thead>
                            <tr className="roundheader">
                                <th>Name</th>
                                <th>Description</th>
                                <th className="buttoncolumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category.Slug}>
                                        <td>{category.Name}</td>
                                        <td>{category.Description}</td>
                                        <td>
                                            <button
                                                className="gridbutton"
                                                onClick={() => handleEdit(category.Slug)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="gridbutton"
                                                onClick={() => handleDelete(category._id)} // Add delete button
                                            >
                                                Delete
                                            </button>
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
        </div>
    );
};

export default CategoryList;
