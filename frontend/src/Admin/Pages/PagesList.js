import React, { useState, useEffect, useRef } from 'react';
import { getAllPages, deletePage } from '../../Services/PagesService';
import { useNavigate } from 'react-router-dom'; 


const PagesList = () => {
    const [Pages, setPages] = useState([]);
    const navigate = useNavigate(); // Initialize navigate
    const isFetchedRef = useRef(false); // Track if data has already been fetched
    useEffect(() => {
        if (!isFetchedRef.current) {
        const fetchPages = async () => {
            try {
                const response = await getAllPages();
                setPages(response.data); 
            } catch (err) {
                console.error('Error fetching Pages:', err);
            }
        };

        fetchPages();
        isFetchedRef.current = true;
    }
    }, []);

    const handleEdit = (PageSlug) => {
        navigate(`/admin/Page/Edit/${PageSlug}`);
    };

    const handleCreate = () => {
        // Navigate to the create page
        navigate('/admin/Pages/create');
    };

    const handleDelete = async (PageId) => {
        
        if (window.confirm("Are you sure you want to delete this Page? This will also delete all related subPages and products.")) {
            try {
                await deletePage(PageId); // Call the delete function
                setPages(Pages.filter(Page => Page._id !== PageId)); // Remove the deleted Page from state
            } catch (error) {
                console.error('Error deleting Page:', error);
            }
        }
    };

    return (
        <>
      
           
            <div className="white-bg-btn">
                <div className='title-bread-crumbs'>
               <p>Pages</p> 
               </div>
            <button className="button" onClick={handleCreate}>
                        Create Page
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
                            {Pages.length > 0 ? (
                                Pages.map((Page) => (
                                    <tr key={Page.Slug}>
                                        <td>{Page.Title}</td>
                                        <td>{Page.Content}</td>
                                        <td>
                                        <div className='customization-main-btns'>
                                            <button
                                                className="gridbutton"
                                                onClick={() => handleEdit(Page.Slug)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="gridbutton delete-button"
                                                onClick={() => handleDelete(Page._id)} // Add delete button
                                            >
                                                Delete
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No Pages found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
      
        </>
    );
};

export default PagesList;
