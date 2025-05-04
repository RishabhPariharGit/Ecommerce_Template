import React, { useState, useEffect, useRef } from 'react';
import { addScrollingText, updateScrollingText, getScrollingTextById } from '../../../../../Services/AdminServices/Allservices/ScrollingTextService';
import '../../../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';


const ScrollingTextForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Text: '',
        Status: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const { Id } = useParams();
    const navigate = useNavigate();

    const isFetchedRef = useRef(false); // Track if data has already been fetched

    // Load ScrollingText data if in edit mode
    useEffect(() => {
        if (!isFetchedRef.current) {
            const loadScrollingText = async () => {
                try {
                    const response = await getScrollingTextById(Id);

                    if (!response.data) {
                        console.error('ScrollingText data is null or not found');
                        // Handle error state here, e.g., show a message or redirect
                        return;
                    }
                    const ScrollingText = response.data;
                    console.log("ScrollingText",ScrollingText)
                    setFormData({
                        Text: ScrollingText.Text,
                        Status: ScrollingText.audit.status
                    });
                } catch (err) {
                    console.error('Error fetching ScrollingText:', err);
                } finally {
                    setIsLoading(false);
                }

            };

            if (isEditMode && Id) {
                loadScrollingText();
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
        navigate('/admin/ScrollingTexts');
    };

   

 

    const handleSubmitFile = async (e) => {
        
        e.preventDefault();

        try {
            let response;
            if (isEditMode) {
                response = await updateScrollingText(Id, formData);
            } else {
                response = await addScrollingText(formData);
            }

            if (response && response.data) {
                alert(response.message); // Show API response message in an alert
            } else {
                alert('Unexpected response from the server');
            }
            navigate('/admin/ScrollingTexts');
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>

            
                <div className='pagetitle'>
                    {isEditMode ? 'Edit ScrollingText' : 'Create a New ScrollingText'}
                </div>
           
          
            <div className="form-800">
                <div className="white-bg">
                    <div className='input-form'>
                        <form onSubmit={handleSubmitFile}>
                            <table>
                                <tbody>
                                    
                                    <tr>
                                        <td colSpan="2">
                                            <div className="formlabel">Text</div>
                                            <textarea
                                                name="Text"
                                                value={formData.Text}
                                                onChange={handleInputChange}
                                            />
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

export default ScrollingTextForm;
