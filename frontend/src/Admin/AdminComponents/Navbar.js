import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ toggleSidenav }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar-container ">
     <div>
        <button className="menu-toggle"onClick={toggleSidenav} >
          ☰
        </button>
        </div>
        {/* Search Box */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search…"
            className="search-input"
          />
        </div>

        {/* Icons Section */}
        <div className="icons-container">
          <button className="icon-btn">
            📩
            <span className="badge">4</span>
          </button>
          <button className="icon-btn">
            🔔
            <span className="badge">17</span>
          </button>
          <button className="icon-btn" onClick={toggleMobileMenu}>👤</button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="Profile-menu">
          <button>Messages</button>
          <button>Notifications</button>
          <button >Profile</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
