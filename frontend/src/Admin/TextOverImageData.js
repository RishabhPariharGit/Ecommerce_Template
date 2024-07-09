import React, { useEffect, useState } from 'react';
import './TextoverimageData.css';

const TextOverImageData = () => {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    Heading: '',
    Subhead: '',
    Imgurl: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/textoverimage')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched TextOverImage data:', data);
        setData(data);
      })
      .catch(error => console.error('Error fetching TextOverImage Data:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/textoverimage/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setData(data.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting TextOverImage Data:', error));
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditData({
      id: item._id,
      Heading: item.Heading,
      Subhead: item.Subhead,
      Imgurl: item.Imgurl
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/textoverimage/${editData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setEditMode(false);
        setData(data.map(item => (item._id === editData.id ? editData : item)));
      })
      .catch(error => console.error('Error updating TextOverImage Data:', error));
  };

  return (
    <div className="container">
      <h2>Text Over Image Data</h2>
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Heading:</label>
            <input type="text" name="Heading" value={editData.Heading} onChange={handleChange} />
          </div>
          <div>
            <label>Subhead:</label>
            <input type="text" name="Subhead" value={editData.Subhead} onChange={handleChange} />
          </div>
          <div>
            <label>Image URL:</label>
            <input type="text" name="Imgurl" value={editData.Imgurl} onChange={handleChange} />
          </div>
          <button type="submit">Update</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          {data.length === 0 ? (
            <p className="no-data">No data available</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Heading</th>
                  <th>Subhead</th>
                  <th>Image URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Heading}</td>
                    <td>{item.Subhead}</td>
                    <td>
                      <img src={item.Imgurl} alt={`Image for ${item.Heading}`} />
                    </td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default TextOverImageData;
