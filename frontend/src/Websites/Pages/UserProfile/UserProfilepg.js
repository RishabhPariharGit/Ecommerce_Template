import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import {
  AccountCircleOutlined,
  ListAltOutlined,
  LocationOnOutlined,
  LiveHelpOutlined
} from '@mui/icons-material';
import { TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserProfile ,updateUser} from '../../../Services/WebsiteServices/AllServices/UserService';
import './UserProfile.css'

const UserProfile = ({ isEditMode = false }) => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Phone: '',
    Email: '',
    Gender: '',
    DateOfBirth: '',
    Location: '',
    AlternateMobile: '',
    Username:''
  });
  const isFetchedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetchedRef.current) {
      const fetchUserData = async () => {
        const token = Cookies.get('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        try {
          const response = await getUserProfile(token);
          setFormData({
            FirstName: response.data.FirstName || '',
            LastName: response.data.LastName || '',
            Phone: response.data.Phone || '',
            Email: response.data.Email || '',
            Gender: response.data.Gender || '',
            DateOfBirth: response.data.DateOfBirth ? response.data.DateOfBirth.substring(0, 10) : '',
            Location: response.data.Location || '',
            AlternateMobile: response.data.AlternateMobile || '',
            Username:response.data.Username || ''
           
          });

          if (response?.data) {
            setUserData(response.data);
          } else {
            setUserData(null);
            console.error('Error fetching user data:', response.message);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
      isFetchedRef.current = true;
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSavechanges = async () => {
    debugger
    const token = Cookies.get('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    if (!userData?.Username) {
      console.error('No username found in user data');
      return;
    }
  
    try {
      const response = await updateUser(userData.Username, formData);
      console.log('User updated:', response.data);
      navigate('/My/Profile');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  


  return (
    <>
      <div className="account-container">
        <div className="col-md-3">
          <div className="profile-sidebar">
            <ul>
              <li>
                <button className="Account-item" onClick={() => navigate('/My/Profile')}>
                  <AccountCircleOutlined /> Account
                </button>
              </li>
              <li>
                <button className="Account-item" onClick={() => navigate('/My/Orders')}>
                  <ListAltOutlined /> Orders
                </button>
              </li>
              <li>
                <button className="Account-item" onClick={() => navigate('/My/Orders')}>
                  <LocationOnOutlined /> Addresses
                </button>
              </li>
              <li>
                <button className="Account-item" onClick={() => navigate('/My/Orders')}>
                  <LiveHelpOutlined /> FAQ
                </button>
              </li>
            </ul>
          </div>
          <div className="profile-logoutbtn"> Logout </div>
        </div>

        <div className="page-profile col-md-9">
          {!isEditMode ? (
            <div className="profile-card">
              <div className="profile-infoLabel">Profile Details</div>
              <table className="profile-infoTable">
                <tbody>
                  <tr>
                    <td className="heading">Full Name</td>
                    <td>{(userData?.FirstName || '') + ' ' + (userData?.LastName || '') || 'Not added yet'}</td>
                  </tr>
                  <tr>
                    <td className="heading">Mobile Number</td>
                    <td>{userData?.Phone || 'Not added yet'}</td>
                  </tr>
                  <tr>
                    <td className="heading">Email ID</td>
                    <td>{userData?.Email || 'Not added yet'}</td>
                  </tr>
                  <tr>
                    <td className="heading">Gender</td>
                    <td>{userData?.Gender || 'Not added yet'}</td>
                  </tr>
                  <tr>
                    <td className="heading">Date of Birth</td>
                    <td>{userData?.DateOfBirth || 'Not added yet'}</td>
                  </tr>
                  <tr>
                    <td className="heading">Location</td>
                    <td>{userData?.Location || 'Not added yet'}</td>
                  </tr>
                  <tr>
                    <td className="heading">Alternate Mobile</td>
                    <td>{userData?.AlternateMobile || 'Not added yet'}</td>
                  </tr>
                  
                </tbody>
              </table>
              <div className="profile-editButton" onClick={() => navigate('/My/Profile/Edit')}>
                EDIT
              </div>
            </div>
          ) : (
            <div className="profile-card">
              <div className="profile-infoLabel">Edit Profile</div>
              <div className="p-5">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="First Name"
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Last Name"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Mobile Number"
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email ID"
                      name="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Gender"
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div>Date of Birth</div>
                    <TextField
                      type="date"
                      name="DateOfBirth"
                      value={formData.DateOfBirth}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Location"
                      name="Location"
                      value={formData.Location}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Alternate Mobile"
                      name="AlternateMobile"
                      value={formData.AlternateMobile}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                 
                 
                  <Grid item xs={12} textAlign="center">
                    <Button
                      variant="outlined"
                      className="button"
                      sx={{
                        backgroundColor: '#fff',
                        color: '#000',
                        border: '1px solid #000'
                      }}
                      onClick={handleSavechanges}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
