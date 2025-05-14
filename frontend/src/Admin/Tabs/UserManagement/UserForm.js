import React, { useState, useEffect, useRef } from 'react';
import { addUser, getUserByUsername, updateUser }
    from '../../../Services/AdminServices/Allservices/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import '../../AdminStyle/AdminGlobalStyle.css';


const UserForm = ({ isEditMode = false }) => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName:'',
        Username: '',
        Email: '',
        Phone: '',
        Password: '',
        ConfirmPassword: '', // New Confirm Password field
        IsAdmin: false,
        IsSystemAdmin: false,
        Status: '',
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
                    if(response.data)
                    {
                        console.log("getUserByUsername",response.data)
                        const user =response.data;
                        setFormData({ 
                            FirstName: user.FirstName,
                            LastName:user.LastName,
                            Username: user.Username,
                            Email: user.Email,
                            Phone: user.Phone,
                            Password: '',
                            ConfirmPassword: '', // New Confirm Password field
                            IsAdmin: user.IsAdmin,
                            IsSystemAdmin: user.IsSystemAdmin,
                            Status: user.audit.status,
                        });

                    }else{
                        setFormData(null);
                    }
                  

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
                await addUser(formData);
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


            <div className='pagetitle'>
                User Form
            </div>

            {/* <div className="pagetitle">{isEditMode ? 'Edit User' : 'Create a New User'}</div> */}
            <div className="form-800">
                <div className="white-bg">
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                <td>
                                        <div className="formlabel">FirstName</div>
                                        <input
                                            type="text"
                                            name="FirstName"
                                            value={formData.FirstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <div className="formlabel">LastName</div>
                                        <input
                                            type="text"
                                            name="LastName"
                                            value={formData.LastName}
                                            onChange={handleInputChange}
                                            required
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

                                    {isEditMode && (
                                      
                                            <td colSpan="2">
                                                <label>Status:</label>
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
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="IsAdmin"
                                                checked={formData.IsAdmin}
                                                onChange={handleInputChange}
                                            />
                                            <span className="formlabel">Is Admin</span>
                                        </div>


                                    </td>
                                    <td>
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="IsSystemAdmin"
                                                checked={formData.IsSystemAdmin}
                                                onChange={handleInputChange}
                                            />
                                            <span className="formlabel pl-2">Is System Admin</span>
                                        </div>


                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div >
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
