import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeBannerChanges.css'

const AdminPanel = ({ onNewData }) => {
  const [formData, setFormData] = useState({
    Heading: '',
    Subhead: '',
    Imgurl: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/textoverimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        onNewData(); // Call the callback function
        // Optionally, you can reset the form or display a success message here
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleViewData = () => {
    navigate('/textoverimagedata');
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Heading:</label>
          <input type="text" name="Heading" value={formData.Heading} onChange={handleChange} />
        </div>
        <div>
          <label>Subhead:</label>
          <input type="text" name="Subhead" value={formData.Subhead} onChange={handleChange} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="Imgurl" value={formData.Imgurl} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleViewData}>View Data</button>
    </div>
  );
};

export default AdminPanel;
