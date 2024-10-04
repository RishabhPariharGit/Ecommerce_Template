import React, { useState, useEffect } from 'react';
import '../AdminStyle/AdminGlobalStyle.css';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    if (window.innerWidth < 950) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 950) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* Top navigation bar */}
      <nav className="top-nav">
        <img className="top-nav-logo" src="https://cdn.worldvectorlogo.com/logos/chinon.svg" alt="Logo" />
        <button className="hamburger-btn" onClick={toggleNav}>
          ☰
        </button>
      </nav>

      {/* Side Navigation Menu */}
      <div className={`side-nav ${isOpen ? 'open' : ''}`}>
        <img className="side-nav-logo" src="https://cdn.worldvectorlogo.com/logos/chinon.svg" alt="Logo" />
        <ul>
          <li>Home</li>
          <li>Orders</li>
          <li>Products</li>
          <li>Customers</li>
          <li>Content</li>
          <li>Analytics</li>
          <li>Marketing</li>
          <li>Discounts</li>
          <li>Online Store</li>
          <li>Point of Sale</li>
          <li>Apps</li>
          <li>Settings</li>
        </ul>
      </div>

      {isOpen && window.innerWidth < 950 && (
        <div className="overlay" onClick={toggleNav}></div>
      )}
    </div>
  );
};
export default Dashboard;
