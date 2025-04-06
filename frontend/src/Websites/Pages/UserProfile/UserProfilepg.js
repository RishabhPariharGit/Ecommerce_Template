import React, { useEffect, useState,useRef } from 'react';
import Cookies from 'js-cookie';
import { getUserProfile } from '../../../Services/WebsiteServices/AllServices/UserService'; 
const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const isFetchedRef = useRef(false);
    useEffect(() => {
        if (!isFetchedRef.current) {
      const fetchUserData = async () => {
    
        const token = Cookies.get('token'); 
  alert(token)
        if (!token) {
          console.error('No token found');
          return;
        }
  
        try {
          const response = await getUserProfile(token); // Pass the token to the backend
          console.log("response",response.user)
          setUserData(response.user); // Store the user data in state
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
      isFetchedRef.current = true;
    }
    }, []);
  
    if (!userData) {
      return <div>Loading user data...</div>;
    }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userData.Name}</p>
      <p><strong>Email:</strong> {userData.Email}</p>
    </div>
  );
};

export default UserProfile;
