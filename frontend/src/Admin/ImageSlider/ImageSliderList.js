import React, { useState, useEffect, useRef } from 'react';
import { getAllImageSliders, deleteImageSlider } from '../../Services/ImageSliderService/ImageSliderService_Admin'; // Import deleteImageSlider
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const ImageSliderList = () => {
    const [ImageSliders, setImageSliders] = useState([]);
    const navigate = useNavigate(); // Initialize navigate
    const isFetchedRef = useRef(false); // Track if data has already been fetched
    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchImageSliders = async () => {
                try {
                    debugger
                    const response = await getAllImageSliders();
                    if (response && response.data) {
                        setImageSliders(response.data);
                    } else {
                        setImageSliders([]); // Ensure ImageSliders is always an array
                    }
                } catch (err) {
                    console.error('Error fetching ImageSliders:', err);
                }
            };

            fetchImageSliders();
            isFetchedRef.current = true;
        }
    }, []);

    const handleEdit = (ImageSliderSlug) => {
        // Navigate to the edit page with the ImageSlider slug
        navigate(`/admin/ImageSlider/edit/${ImageSliderSlug}`);
    };

    const handleCreate = () => {
        // Navigate to the create page
        navigate('/admin/ImageSlider/create');
    };

    const handleDelete = async (ImageSliderId) => {
        if (window.confirm("Are you sure you want to delete this ImageSlider? This will also delete all related subImageSliders and products.")) {
            try {
                await deleteImageSlider(ImageSliderId); // Call the delete function
                setImageSliders(ImageSliders.filter(ImageSlider => ImageSlider._id !== ImageSliderId)); // Remove the deleted ImageSlider from state
            } catch (error) {
                console.error('Error deleting ImageSlider:', error);
            }
        }
    };

    return (
        <>
            <div className="white-bg-btn">
                <div className='title-bread-crumbs'>
                    <p>ImageSliders</p>
                </div>
                <button className="button" onClick={handleCreate}>
                    Create ImageSlider
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
                            {Array.isArray(ImageSliders) && ImageSliders.length > 0 ? (
                                ImageSliders.map((ImageSlider) => (
                                    <tr key={ImageSlider._id}>
                                        <td>{ImageSlider.Text}</td>
                                       
                                        <td>
                                            <div className='customization-main-btns'>
                                                <button
                                                    className="gridbutton"
                                                    onClick={() => handleEdit(ImageSlider._id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="gridbutton delete-button"
                                                    onClick={() => handleDelete(ImageSlider._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No ImageSliders found</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

        </>
    );
};

export default ImageSliderList;
