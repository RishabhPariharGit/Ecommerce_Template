import React, { useEffect, useState, useRef } from 'react';
import { getAllsections,deleteSection } from '../../Services/HomepageSectionService'; // Adjust service functions for Sections
import { useNavigate } from 'react-router-dom';
import Navbar from '../AdminComponents/Navbar';

const HomepageSectionList = () => {
    const [Sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // Initialize navigate
    const isFetchedRef = useRef(false);
    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchSections = async () => {
                try {
                    debugger
                    const response = await getAllsections(); // Fetch all Sections from the service
                    setSections(response.data); // Assuming response.data contains an array of Sections
                    setError(null); // Clear any previous error
                } catch (err) {
                    console.error('Error fetching Sections:', err);
                    setError('Failed to fetch Sections. Please try again later.');
                } finally {
                    setIsLoading(false); // Stop loading regardless of success or error
                }
            };

            fetchSections();
            isFetchedRef.current = true;
        }
    }, []);

    const handleEdit = (id) => {
        navigate(`/admin/HomepageSection/Edit/${id}`);
    };

    const handleCreate = () => {
        debugger
        navigate('/admin/HomepageSection/create'); 
    };

  
    const handleDelete = async (sectionid) => {
        if (window.confirm("Are you sure you want to delete this section?")) {
            try {
                await deleteSection(sectionid);
                setSections(Sections.filter(Section => Section._id !== sectionid)); 
            } catch (error) {
                console.error('Error deleting Section:', error);
            }
        }
    };



    return (
        <>

            <Navbar />
            <div className="white-bg-btn">
                <div className='title-bread-crumbs'>
                    <p>HomepageSections</p>
                </div>
                <button className="button" onClick={handleCreate}>
                    Create HomepageSection
                </button>
            </div>
            <div className="form-600">
                <div className="white-bg">

                    {error && <div className="error">{error}</div>} {/* Display error message */}
                    <table className="tablestyle">
                        <thead>
                            <tr className="roundheader">
                                <th>Name</th>
                                <th>SectionType</th>
                                <th>DisplayOrder</th>
                                <th>Status</th>
                          <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Sections.length > 0 ? (
                                Sections.map((section) => (
                                    <tr key={section._id}>
                                        <td>{section.Title}</td>
                                        <td>{section.SectionType}</td>
                                        <td>{section.DisplayOrder}</td>
                                        <td>{section.Status}</td>
                                        <td>
                                        
                                        </td>
                                        <td>
                                            <div className='customization-main-btns'>
                                                <button
                                                    className="gridbutton"
                                                    onClick={() => handleEdit(section._id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="gridbutton delete-button"
                                                    onClick={() => handleDelete(section._id)} // Add delete button
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Sections found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HomepageSectionList;
