import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
        debugger
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/UserDetails", {
          headers: { 'Authorization': token }
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/login');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {userDetails.Name}</p>
      <p>Email: {userDetails.Email}</p>
    </div>
  );
}
