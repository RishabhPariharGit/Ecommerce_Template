import React from 'react';
import './Navbar.css'; // Assuming the styles are in a separate CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="menu-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="search-bar">
        <i className="search-icon">&#128269;</i>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="icons">
        <div className="icon">
          <i className="mail-icon">&#9993;</i>
          <span className="badge">4</span>
        </div>
        <div className="icon">
          <i className="bell-icon">&#128276;</i>
          <span className="badge">17</span>
        </div>
        <div className="icon">
          <i className="profile-icon">&#128100;</i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
