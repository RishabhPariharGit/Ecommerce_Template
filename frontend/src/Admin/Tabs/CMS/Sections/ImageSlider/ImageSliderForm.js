import React, { useState, useEffect, useRef } from 'react';
import { addImageSlider, updateImageSlider, getImageSliderById } from '../../../../../Services/AdminServices/Allservices/ImageSliderService';
import '../../../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';


const ImageSliderForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Image: '',
        Text: '',
        Link: '',
        Description: '',
        Status: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const { Id } = useParams();
    const navigate = useNavigate();

    const isFetchedRef = useRef(false); // Track if data has already been fetched

    // Load ImageSlider data if in edit mode
    useEffect(() => {
        if (!isFetchedRef.current) {
            const loadImageSlider = async () => {
                try {
                    const response = await getImageSliderById(Id);

                    if (!response.data) {
                        console.error('ImageSlider data is null or not found');
                        // Handle error state here, e.g., show a message or redirect
                        return;
                    }
                    const ImageSlider = response.data;
                    console.log("ImageSlider",ImageSlider)
                    setFormData({
                        Image: ImageSlider.Image,
                        Text: ImageSlider.Text,
                        Link: ImageSlider.Link,
                        Description: ImageSlider.Description,
                        Status: ImageSlider.audit.status
                    });
                } catch (err) {
                    console.error('Error fetching ImageSlider:', err);
                } finally {
                    setIsLoading(false);
                }

            };

            if (isEditMode && Id) {
                loadImageSlider();
            } else {
                setIsLoading(false);
            }

            isFetchedRef.current = true; // Mark data as fetched
        }
    }, [isEditMode, Id]);

    const handleInputChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        navigate('/admin/ImageSliders');
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            previewFile(file);
        } else {
            alert('Please upload a valid image file.');
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            setFormData((prevData) => ({ ...prevData, Image: reader.result }));
        };
    };

    const handleSubmitFile = async (e) => {
        debugger
        e.preventDefault();

        try {
            let response;
            if (isEditMode) {
                response = await updateImageSlider(Id, formData);
            } else {
                response = await addImageSlider(formData);
            }

            if (response && response.data) {
                alert(response.message); // Show API response message in an alert
            } else {
                alert('Unexpected response from the server');
            }
            navigate('/admin/ImageSliders');
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>

            <div className="white-bg-btn">
                <div className='title-bread-crumbs'>
                    <p>{isEditMode ? 'Edit ImageSlider' : 'Create a New ImageSlider'}</p>
                </div>
            </div>
          
            <div className="form-800">
                <div className="white-bg">
                    <div className='input-form'>
                        <form onSubmit={handleSubmitFile}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="formlabel">Text</div>
                                            <input
                                                type="text"
                                                name="Text"
                                                value={formData.Text}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <div className="formlabel">Link</div>
                                            <input
                                                type="text"
                                                name="Link"
                                                value={formData.Link}
                                                onChange={handleInputChange}
                                                required
                                               
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Description</div>
                                            <textarea
                                                name="Description"
                                                value={formData.Description}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="formlabel">Image</div>
                                            <input
                                                type="file"
                                                name="Image"
                                                onChange={handleFileInputChange}
                                                required={!isEditMode}
                                            />
                                        </td>
                                        {isEditMode && (
                                            <td>
                                                <label htmlFor="status">Status:</label>
                                                <select
                                                    name="Status"
                                                    value={formData.Status}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td>
                                            {(previewSource || (isEditMode && formData.Image)) && (
                                                <img
                                                    src={previewSource || formData.Image}
                                                    alt="Selected"
                                                    style={{ height: '180px' }}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                    <tr>

                                        <td>
                                            <div >
                                                <button type="submit" className="button">
                                                    {isEditMode ? 'Update' : 'Submit'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="button cancel-button"
                                                    onClick={handleCancel}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </td>

                                    </tr>

                                </tbody>
                            </table>
                        </form>

                    </div>


                </div>

            </div>
        </div>
    );
};

export default ImageSliderForm;
