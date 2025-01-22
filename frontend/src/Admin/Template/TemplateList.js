import React, { useState, useEffect, useRef } from 'react';
import { getAllTemplates,deleteTemplate } from '../../Services/TemplateService';
import { useNavigate } from 'react-router-dom'; 


const TemplateList = () => {
    const [Templates, setTemplates] = useState([]);
    const navigate = useNavigate(); // Initialize navigate
    const isFetchedRef = useRef(false); // Track if data has already been fetched
    useEffect(() => {
        if (!isFetchedRef.current) {
        const fetchTemplates = async () => {
            try {
                const response = await getAllTemplates();
                setTemplates(response.data); 
            } catch (err) {
                console.error('Error fetching Templates:', err);
            }
        };

        fetchTemplates();
        isFetchedRef.current = true;
    }
    }, []);

    const handleEdit = (TemplateId) => {
        
        navigate(`/admin/Template/Edit/${TemplateId}`);
    };

    const handleCreate = () => {
        
        // Navigate to the create page
        navigate('/admin/Template/create');
    };

    const handleDelete = async (TemplateId) => {
        if (window.confirm("Are you sure you want to delete this Template? This will also delete all related subTemplates and products.")) {
            try {
               await deleteTemplate(TemplateId); // Call the delete function
                setTemplates(Templates.filter(Template => Template._id !== TemplateId)); // Remove the deleted Page from state
            } catch (error) {
                console.error('Error deleting Template:', error);
            }
        }
    };

    return (
        <>
    
            <div className="white-bg-btn">
                <div className='title-bread-crumbs'>
               <p>Templates</p> 
               </div>
            <button className="button" onClick={handleCreate}>
                        Create Template
                    </button>
                    
                </div>

            <div className="form-600">
                <div className="white-bg">
                    <table className="tablestyle">
                        <thead>
                            <tr className="roundheader">
                                <th>Name</th>
                              
                                <th className="buttoncolumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Templates.length > 0 ? (
                                Templates.map((Template) => (
                                    <tr key={Template._id}>
                                        <td>{Template.name}</td>
                                       
                                        <td>
                                        <div className='customization-main-btns'>
                                            <button
                                                className="gridbutton"
                                                onClick={() => handleEdit(Template._id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="gridbutton delete-button"
                                                onClick={() => handleDelete(Template._id)} // Add delete button
                                            >
                                                Delete
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No Templates found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
      
        </>
    );
};

export default TemplateList;
