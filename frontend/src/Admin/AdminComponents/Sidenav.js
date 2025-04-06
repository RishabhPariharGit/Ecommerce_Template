import React, { useEffect, useState, useRef } from 'react';
import '../AdminStyle/AdminGlobalStyle.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faShoppingCart, faTags, faBoxes, faUsers } from '@fortawesome/free-solid-svg-icons';


const Sidenav = ({ closeSidenav }) => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const isFetchedRef = useRef(false);

  

 
   

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    navigate('/login');
  };

  return (
    <div>
      <div className="widedesktop">
        <div className="top-nav">
          <div className="hamburger-btn">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="top_menu">
            <div className="logo">
              <img id="logo" src="https://cdn.worldvectorlogo.com/logos/akasol-1.svg" alt="Logo" height="40" />
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar overflow-auto">
        <div className="desktop">
          <div className="top_navbar">
            <div className="top_menu">
              <div className="logo center" style={{ paddingTop: '25px' }}>
                <img id="logo" src="https://cdn.worldvectorlogo.com/logos/akasol-1.svg" alt="Logo" height="45" />
              </div>
            </div>
          </div>
        </div>

        <ul style={{ borderTop: 'solid 1px #EEE' }}>
          <li>
            <Link to="/admin/dashboard" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faShoppingCart} className="icon" />
              <span className="title">Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/Category" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faTags} className="icon" />
              <span className="title">Category</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/SubCategory" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faBoxes} className="icon" />
              <span className="title">SubCategory</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/Products" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faTags} className="icon" />
              <span className="title">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/Announcements" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faTags} className="icon" />
              <span className="title">Announcement</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/ImageSliders" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faTags} className="icon" />
              <span className="title">ImageSlider</span>
            </Link>
          </li>
        
          <li>
            <Link to="/admin/Users" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faUsers} className="icon" />
              <span className="title">Users</span>
            </Link>
          </li>
        </ul>

        <div className="logout">
          <div>
            Logged in as <strong>User Name</strong>
          </div>
          <button className='btn logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
