import React, { useEffect, useState,useRef } from 'react';
import { getAllUsers, deleteUser } from '../../Services/UserService'; // Adjust service functions for users
import { useNavigate } from 'react-router-dom'; 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // Initialize navigate
    const isFetchedRef = useRef(false); 
    useEffect(() => {
        if (!isFetchedRef.current) {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers(); // Fetch all users from the service
                setUsers(response.data); // Assuming response.data contains an array of users
                setError(null); // Clear any previous error
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setIsLoading(false); // Stop loading regardless of success or error
            }
        };

        fetchUsers();
        isFetchedRef.current = true;
    }
    }, []);

    const handleEdit = (Username) => {
        debugger
        navigate(`/admin/User/Edit/${Username}`); // Navigate to edit page with user ID
    };

    const handleCreate = () => {
        navigate('/admin/User/create'); // Navigate to create user page
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId); // Call the delete function
                setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from state
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading users...</div>; // Loading indicator
    }

    return (
        <div>
            <div className="pagetitle">
                Users
            </div>
            <div className="white-bg-btn">
            <button className="button" onClick={handleCreate}>
                        Create User
                    </button>
                    </div>
            <div className="form-600">
                <div className="white-bg">
                
                    {error && <div className="error">{error}</div>} {/* Display error message */}
                    <table className="tablestyle">
                        <thead>
                            <tr className="roundheader">
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="buttoncolumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.Name}</td>
                                        <td>{user.Username}</td>
                                        <td>{user.Email}</td>
                                        <td>
                    {user.Roles.join(", ")}
                </td>
                                        <td>
                                        <div className='customization-main-btns'>
                                            <button
                                                className="gridbutton"
                                                onClick={() => handleEdit(user.Username)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="gridbutton delete-button"
                                                onClick={() => handleDelete(user._id)} // Add delete button
                                            >
                                                Delete
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;
