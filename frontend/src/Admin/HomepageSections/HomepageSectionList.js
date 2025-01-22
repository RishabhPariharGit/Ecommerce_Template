import React, { useEffect, useState, useRef } from 'react';
import { getAllsections, deleteSection, updateSectionsAddToSidenav } from '../../Services/HomepageSectionService'; // Adjust service functions for Sections
import { useNavigate } from 'react-router-dom';


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
        
        navigate('/admin/HomepageSection/create');
    };

    const handleAddToSidenav = async () => {
        
       
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
       
        <div className="white-bg-btn">
            <div className="title-bread-crumbs">
                <p>HomepageSections</p>
            </div>
            <div>
            <button className="button" onClick={handleAddToSidenav}>
                Add To SideNav
            </button>
            <button className="button" onClick={handleCreate}>
                Create HomepageSection
            </button>
            </div>
        </div>
        <div className="form-600">
            <div >
                {error && <div className="error">{error}</div>} {/* Display error message */}
                <div className="white-bg">
                <p className="section-title">Active Sections</p>
                <table className="tablestyle">
                    <thead>
                        <tr className="roundheader desktop">
                            <th>Select</th>
                            <th>Name</th>
                            <th>SectionType</th>
                            <th>DisplayOrder</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    {activeSections.length > 0 ? (
        activeSections.map((section) => (
            <>
                <tr className="desktop" key={section._id}>
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
                                onClick={() => handleDelete(section._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
                {/* Mobile row can be conditionally rendered here */}
                <tr className="mobileportrait-mobilewide" key={`${section._id}-mobile`}>
                    
                    <td >
                       <div><b>Select : </b> <input
                            type="checkbox"
                            checked={selectedSections.some(item => item._id === section._id)}
                            onChange={(e) => handleCheckboxChange(e, section)}
                        /></div>
                       <div> <b>Name : </b>
                       {section.Title}
                       </div>
                       <div><b>SectionType : </b>
                       {section.SectionType}
                       </div>
                       <div><b>DisplayOrder : </b>
                       {section.DisplayOrder}
                       </div>
                       <div><b>Status : </b>
                       {section.Status}
                       </div>

                       <div className="customization-main-btns">
                       <b>Action : </b>

                            <button
                                className="gridbutton"
                                onClick={() => handleEdit(section._id)}
                            >
                                Edit
                            </button>
                            <button
                                className="gridbutton delete-button"
                                onClick={() => handleDelete(section._id)}
                            >
                                Delete
                            </button>
                        </div>



                    </td>
                </tr>
            </>
        ))
    ) : (
        <tr>
            <td colSpan="6">No Active Sections found</td>
        </tr>
    )}
</tbody>
 </table>
 </div>

                <div className="white-bg">
                <p className='section-title'>Inactive Sections</p>
                <table className="tablestyle">
                    <thead>
                        <tr className="desktop roundheader">
                            <th>Select</th>
                            <th>Name</th>
                            <th>SectionType</th>
                            <th>DisplayOrder</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inactiveSections.length > 0 ? (
                            inactiveSections.map((section) => (
                                <>
                                <tr className='desktop' key={section._id}>
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


                                <tr className="mobileportrait-mobilewide">
                                <td >
                       <div><b>Select : </b> <input
                            type="checkbox"
                            checked={selectedSections.some(item => item._id === section._id)}
                            onChange={(e) => handleCheckboxChange(e, section)}
                        /></div>
                       <div> <b>Name : </b>
                       {section.Title}
                       </div>
                       <div><b>SectionType: </b>
                       {section.SectionType}
                       </div>
                       <div><b>DisplayOrder : </b>
                       {section.DisplayOrder}
                       </div>
                       <div><b>Status : </b>
                       {section.Status}
                       </div>

                       <div className="customization-main-btns">
                       <b>Action : </b>

                            <button
                                className="gridbutton"
                                onClick={() => handleEdit(section._id)}
                            >
                                Edit
                            </button>
                            <button
                                className="gridbutton delete-button"
                                onClick={() => handleDelete(section._id)}
                            >
                                Delete
                            </button>
                        </div>


                    </td>

                                </tr>
                                </>

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
