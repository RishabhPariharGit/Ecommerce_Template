import React, { useState, useEffect, useRef } from 'react';
import { registerUser, getUserByUsername, updateUser } from '../../Services/UserService'; 
import { useNavigate, useParams } from 'react-router-dom';
import '../AdminStyle/AdminGlobalStyle.css';


const UserForm = ({ isEditMode = false }) => {
    const [formData, setFormData] = useState({
        Name: '',
        Username: '',
        Email: '',
        Phone: '',
        Password: '',
        ConfirmPassword: '', // New Confirm Password field
        IsAdmin: false,
        IsSystemAdmin: false,
    });

    const { Username } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [passwordError, setPasswordError] = useState(''); // State to store password validation error
    const isFetchedRef = useRef(false);

    useEffect(() => {
        
        if (!isFetchedRef.current) {
            const loadUser = async () => {
                try {
                    const response = await getUserByUsername(Username);
                    setFormData({ ...response.data, Password: '', ConfirmPassword: '' });
                } catch (error) {
                    console.error('Error loading user:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            if (isEditMode && Username) {
                loadUser();
            } else {
                setIsLoading(false);
            }
            isFetchedRef.current = true;
        }
    }, [isEditMode, Username]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.Password !== formData.ConfirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        try {
            if (isEditMode) {
                await updateUser(Username, formData);
                console.log('User updated successfully');
            } else {
                await registerUser(formData);
                console.log('User added successfully');
            }
            navigate('/admin/Users');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/admin/Users');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
         
            <div className="white-bg-btn">
            <div className='title-bread-crumbs'>
               <p>User Form</p> 
               </div>
            </div>
            {/* <div className="pagetitle">{isEditMode ? 'Edit User' : 'Create a New User'}</div> */}
            <div className="form-800">
                <div className="white-bg">
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="formlabel">Name</div>
                                        <input
                                            type="text"
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">Username</div>
                                        <input
                                            type="text"
                                            name="Username"
                                            value={formData.Username}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isEditMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="formlabel">Email</div>
                                        <input
                                            type="email"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">Phone</div>
                                        <input
                                            type="tel"
                                            name="Phone"
                                            value={formData.Phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                {!isEditMode && (
    <tr>
        <td>
            <div className="formlabel">Password</div>
            <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
            />
        </td>
        <td>
            <div className="formlabel">Confirm Password</div>
            <input
                type="password"
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={handleInputChange}
            />
        </td>
    </tr>
)}

                                
                                {passwordError && (
                                    <tr>
                                        <td colSpan="2" style={{ color: 'red', textAlign: 'center' }}>
                                            {passwordError}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>
                                        <div className="formlabel">Is Admin</div>
                                        <input
                                            type="checkbox"
                                            name="IsAdmin"
                                            checked={formData.IsAdmin}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">Is System Admin</div>
                                        <input
                                            type="checkbox"
                                            name="IsSystemAdmin"
                                            checked={formData.IsSystemAdmin}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center">
                        <button type="submit" className="button" disabled={isLoading}>
                            {isEditMode ? 'Update User' : 'Add User'}
                        </button>
                        <button type="button" className="button cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
