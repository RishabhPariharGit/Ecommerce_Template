import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { getUserProfile } from '../../../Services/WebsiteServices/AllServices/UserService';
import './UserProfile.css'

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const isFetchedRef = useRef(false);
  useEffect(() => {
    if (!isFetchedRef.current) {
      const fetchUserData = async () => {

        const token = Cookies.get('token');

        if (!token) {
          console.error('No token found');
          return;
        }

        try {
          const response = await getUserProfile(token); // Pass the token to the backend
          console.log("response", response.user)
          setUserData(response.user); // Store the user data in state
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
      isFetchedRef.current = true;
    }
  }, []);



  return (
    <>
      <div className="account-container">
        <div className='col-md-3'>
          <div className="sidebar">

            <ul>
              <li>Profile</li>
              <li>Orders & Returns</li>
              <li>Addresses</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        <div class="page-profile className='col-md-9'">
          <div class="profile-card">
            <div class="profile-infoLabel">Profile Details</div>
            <table class="profile-infoTable">
              <tbody>
                <tr>
                  <td className='heading'>Full Name</td>
                  <td>Pallavi Hanwat</td>
                </tr>
                <tr>
                  <td className='heading'>Mobile Number</td>
                  <td>7566203077</td>
                </tr>
                <tr>
                  <td className='heading'>Email ID</td>
                  <td>- not added -</td>
                </tr>
                <tr>
                  <td className='heading'>Gender</td>
                  <td>FEMALE</td>
                </tr>
                <tr>
                  <td className='heading'>Date of Birth</td>
                  <td>- not added -</td>
                </tr>
                <tr>
                  <td className='heading'>Location</td>
                  <td>- not added -</td>
                </tr>
                <tr>
                  <td className='heading'>Alternate Mobile</td>
                  <td>- not added -</td>
                </tr>
                <tr>
                  <td className='heading'>Hint Name</td>
                  <td>- not added -</td>
                </tr>
              </tbody>
            </table>
            <div class="profile-editButton"> EDIT </div></div></div>
      </div>
    </>

  );
};

export default UserProfile;
