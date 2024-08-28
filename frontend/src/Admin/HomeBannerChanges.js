import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeBannerChanges.css'

const AdminPanel = ({ onNewData }) => {
  const [formData, setFormData] = useState({
    Mainhead:'',
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
      <h2>Home Banner</h2>
      <form onSubmit={handleSubmit}>

      <div>
          <label>Main Heading</label><br/><p>
          Main Heading for the Main Banner.</p>
        </div>
        <input type="text" name="Mainhead" value={formData.Mainhead} onChange={handleChange} />

        <div>
          <label>Heading</label><br/><p>
          Heading for the Main Banner.</p>
        </div>
        <input type="text" name="Heading" value={formData.Heading} onChange={handleChange} />
        <div>
          <label>Subhead</label><br/><p>
          Sub Heading for the Main Banner.</p>
        </div>
        <input type="text" name="Subhead" value={formData.Subhead} onChange={handleChange} />
        <div>
          <label>Image URL</label><br/><p>
         Images can be stored by posting the image url here.</p>
         </div>
        <input type="text" name="Imgurl" value={formData.Imgurl} onChange={handleChange} />
        <div className='Submit-button-wrapper'>
        <button type="submit">Submit</button>
        <button onClick={handleViewData}>View Data</button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;
