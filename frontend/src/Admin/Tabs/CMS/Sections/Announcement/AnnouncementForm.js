import React, { useState, useEffect, useRef } from 'react';
import { addAnnouncement, updateAnnouncement, getAnnouncementById } from '../../../../../Services/AdminServices/Allservices/AnnouncementService';
import '../../../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';


const AnnouncementForm = ({ isEditMode = false }) => {
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        Text: '',
        ShowInSite: false,
        Status: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const { Id } = useParams();
    const navigate = useNavigate();

    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!isFetchedRef.current) {
            const loadAnnouncement = async () => {
                try {
                    const response = await getAnnouncementById(Id);
                    if (!response.data) {
                        console.error('Announcement data is null or not found');
                        return;
                    }
                    const Announcement = response.data;
                    setFormData({
                        Text: Announcement.Text,
                        ShowInSite: Boolean(Announcement.ShowInSite), // Ensure it's a boolean
                        Status: Announcement.audit.status
                    });
                } catch (err) {
                    console.error('Error fetching Announcement:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            if (isEditMode && Id) {
                loadAnnouncement();
            } else {
                setIsLoading(false);
            }

            isFetchedRef.current = true; // Mark data as fetched
        }
    }, [isEditMode, Id]);


    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value, // Correctly handle checkbox value
        }));
    };



    const handleCancel = () => {
        navigate('/admin/Announcements');
    };





    const handleSubmitFile = async (e) => {

        e.preventDefault();

        try {
            let response;
            if (isEditMode) {
                response = await updateAnnouncement(Id, formData);
            } else {
                response = await addAnnouncement(formData);
            }

            if (response && response.data) {
                alert(response.message);
            } else {
                alert('Unexpected response from the server');
            }
            navigate('/admin/Announcements');
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>


            <div className='pagetitle'>
                {isEditMode ? 'Edit Announcement' : 'Create a New Announcement'}
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


                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="ShowInSite"
                                                    checked={formData.ShowInSite}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="formlabel">Visible in Website</div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>

                                        {isEditMode && (
                                            <td>
                                                <label htmlFor="status" className='formlabel'>Status:</label>
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
                                        <td></td>
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

export default AnnouncementForm;
