import React, { useState, useEffect, useRef } from 'react';
import { getAllAnnouncements, deleteAnnouncement } from '../../../../../Services/AdminServices/Allservices/AnnouncementService'; 
import { useNavigate } from 'react-router-dom';

const AnnouncementList = () => {
    const [Announcements, setAnnouncements] = useState([]);
    const navigate = useNavigate(); 
    const isFetchedRef = useRef(false); 
    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchAnnouncements = async () => {
                try {
                    
                    const response = await getAllAnnouncements();
                    if (response && response.data) {
                        setAnnouncements(response.data);
                    } else {
                        setAnnouncements([]); 
                    }
                } catch (err) {
                    console.error('Error fetching Announcements:', err);
                }
            };

            fetchAnnouncements();
            isFetchedRef.current = true;
        }
    }, []);

    const handleEdit = (AnnouncementId) => {
        navigate(`/admin/Announcement/edit/${AnnouncementId}`);
    };

    const handleCreate = () => {
        // Navigate to the create page
        navigate('/admin/Announcement/create');
    };

    const handleDelete = async (AnnouncementId) => {
        if (window.confirm("Are you sure you want to delete this Announcement? This will also delete all related subAnnouncements and products.")) {
            try {
                await deleteAnnouncement(AnnouncementId); 
                setAnnouncements(Announcements.filter(Announcement => Announcement._id !== AnnouncementId)); 
            } catch (error) {
                console.error('Error deleting Announcement:', error);
            }
        }
    };

    return (
        <>
            <div className="white-bg-btn">
                <div className='title-bread-crumbs'>
                    <p>Announcements</p>
                </div>
                <button className="button" onClick={handleCreate}>
                    Create Announcement
                </button>

            </div>

            <div className="form-600">
                <div className="white-bg">
                    <table className="tablestyle">
                        <thead>
                            <tr className="roundheader">
                                <th>Text</th>
                                <th>Status</th>
                                <th>Visisblein Site</th>
                                <th className="buttoncolumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(Announcements) && Announcements.length > 0 ? (
                                Announcements.map((Announcement) => (
                                    <tr key={Announcement.Id}>
                                        <td>{Announcement.Text}</td>
                                        <td>{Announcement.Status}</td>
                                        <td>{Announcement.ShowInSite}</td>
                                        <td>
                                            <div className='customization-main-btns'>
                                                <button
                                                    className="gridbutton"
                                                    onClick={() => handleEdit(Announcement._id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="gridbutton delete-button"
                                                    onClick={() => handleDelete(Announcement._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No Announcements found</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

        </>
    );
};

export default AnnouncementList;
