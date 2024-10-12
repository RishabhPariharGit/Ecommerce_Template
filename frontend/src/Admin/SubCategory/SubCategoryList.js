import React, { useEffect, useState } from 'react';
import { getAllSubCategories, deleteSubCategory } from '../../Services/CategoryService'; 
import { useNavigate } from 'react-router-dom'; 

const SubCategoryList = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await getAllSubCategories(); 
                setSubCategories(response.data); 
                setError(null); 
            } catch (err) {
                console.error('Error fetching subcategories:', err);
                setError('Failed to fetch subcategories. Please try again later.');
            } finally {
                setIsLoading(false); 
            }
        };

        fetchSubCategories();
    }, []);

    const handleEdit = (subCategorySlug) => {
        navigate(`/admin/SubCategory/Edit/${subCategorySlug}`);
    };

    const handleCreate = () => {
        navigate('/admin/SubCategory/create');
    };

    const handleDelete = async (subCategoryId) => {
        debugger
        const confirmDelete = window.confirm('Are you sure you want to delete this subcategory?');
        if (confirmDelete) {
            try {
                await deleteSubCategory(subCategoryId); // Call the delete function
                setSubCategories(prev => prev.filter(subCategory => subCategory._id !== subCategoryId)); // Update state
            } catch (err) {
                console.error('Error deleting subcategory:', err);
                setError('Failed to delete subcategory. Please try again later.');
            }
        }
    };
  
    if (isLoading) {
        return <div>Loading subcategories...</div>;
    }

    return (
        <div>
            <div className="pagetitle">
                Subcategories
            </div>
            <div className="form-600">
                <div className="white-bg">
                    <button className="button" onClick={handleCreate}>
                        Create Subcategory
                    </button>
                    {error && <div className="error">{error}</div>}
                    <table className="tablestyle">
                        <thead>
                            <tr className="roundheader">
                                <th>Name</th>
                                <th>Description</th>
                                <th className="buttoncolumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategories.length > 0 ? (
                                subCategories.map((subCategory) => (
                                    <tr key={subCategory.Slug}>
                                        <td>{subCategory.Name}</td>
                                        <td>{subCategory.Description}</td>
                                        <td>
                                            <button
                                                className="gridbutton"
                                                onClick={() => handleEdit(subCategory.Slug)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="gridbutton delete-button" // Add a class for styling
                                                onClick={() => handleDelete(subCategory._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No subcategories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryList;
