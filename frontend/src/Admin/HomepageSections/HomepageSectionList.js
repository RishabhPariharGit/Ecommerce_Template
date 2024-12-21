import React, { useEffect, useState, useRef } from 'react';
import { getAllsections, deleteSection, updateSectionsAddToSidenav } from '../../Services/HomepageSectionService'; // Adjust service functions for Sections
import { useNavigate } from 'react-router-dom';
import Navbar from '../AdminComponents/Navbar';

const HomepageSectionList = () => {
    const [Sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // Initialize navigate
    const [selectedSections, setSelectedSections] = useState([]);
    const isFetchedRef = useRef(false);
    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchSections = async () => {
                try {
                    debugger
                    const response = await getAllsections(); // Fetch all Sections from the service
                    setSections(response.data); // Assuming response.data contains an array of Sections
                    const preSelected = response.data.filter(section => section.AddToSidenav);
                    setSelectedSections(preSelected);
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
  
    const handleCheckboxChange = (e, section) => {
        debugger
        const { checked } = e.target;
    
        // Update the Sections state to reflect the AddToSidenav change
        setSections((prevSections) =>
            prevSections.map((item) =>
                item._id === section._id ? { ...item, AddToSidenav: checked } : item
            )
        );
    
        // Update the selectedSections based on the checked state
        setSelectedSections((prevSelectedSections) =>
            checked
                ? [...prevSelectedSections, { ...section, AddToSidenav: checked }] // Add section with updated property
                : prevSelectedSections.filter(item => item._id !== section._id) // Remove if unchecked
        );
    };
    
    
    const handleCreate = () => {
        debugger
        navigate('/admin/HomepageSection/create');
    };

    const handleAddToSidenav = async () => {
        debugger
       
        try {
            const response = await updateSectionsAddToSidenav(selectedSections);
            if (response.status === 200) {
                alert('Selected sections updated successfully.');             
                const updatedSections = await getAllsections();
                setSections(updatedSections.data);
                const preSelected = response.data.filter(section => section.AddToSidenav);
                    setSelectedSections(preSelected);
            }
        } catch (error) {
            console.error('Error updating sections:', error);
            alert('Failed to update sections.');
        }
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
    const activeSections = Sections.filter(section => section.AddToSidenav);
    const inactiveSections = Sections.filter(section => !section.AddToSidenav);


    return (
        <>
        <Navbar />
        <div className="white-bg-btn">
            <div className="title-bread-crumbs">
                <p>HomepageSections</p>
            </div>

            <button className="button" onClick={handleAddToSidenav}>
                Add To SideNav
            </button>
            <button className="button" onClick={handleCreate}>
                Create HomepageSection
            </button>
        </div>
        <div className="form-600">
            <div >
                {error && <div className="error">{error}</div>} {/* Display error message */}
                <div className="white-bg">
                <h5>Active Sections</h5>
                <table className="tablestyle">
                    <thead>
                        <tr className="roundheader">
                            <th></th>
                            <th>Name</th>
                            <th>SectionType</th>
                            <th>DisplayOrder</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeSections.length > 0 ? (
                            activeSections.map((section) => (
                                <tr key={section._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedSections.some(item => item._id === section._id)}
                                            onChange={(e) => handleCheckboxChange(e, section)}
                                        />
                                    </td>
                                    <td>{section.Title}</td>
                                    <td>{section.SectionType}</td>
                                    <td>{section.DisplayOrder}</td>
                                    <td>{section.Status}</td>
                                    <td>
                                        <div className="customization-main-btns">
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
                                <td colSpan="5">No Active Sections found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>

                <div className="white-bg">
                <h3>Inactive Sections</h3>
                <table className="tablestyle">
                    <thead>
                        <tr className="roundheader">
                            <th></th>
                            <th>Name</th>
                            <th>SectionType</th>
                            <th>DisplayOrder</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inactiveSections.length > 0 ? (
                            inactiveSections.map((section) => (
                                <tr key={section._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedSections.some(item => item._id === section._id)}
                                            onChange={(e) => handleCheckboxChange(e, section)}
                                        />
                                    </td>
                                    <td>{section.Title}</td>
                                    <td>{section.SectionType}</td>
                                    <td>{section.DisplayOrder}</td>
                                    <td>{section.Status}</td>
                                    <td>
                                        <div className="customization-main-btns">
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
                                <td colSpan="5">No Inactive Sections found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </>
    );
};

export default HomepageSectionList;
