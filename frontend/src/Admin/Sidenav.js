import React, { useEffect, useState, useRef } from 'react';
import './AdminStyle/AdminGlobalStyle.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faShoppingCart, faTags, faBoxes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { getAllsections } from '../Services/HomepageSectionService';

const Sidenav = ({ closeSidenav }) => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const isFetchedRef = useRef(false);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      const response = await getAllsections(); // Fetch all sections from the service
      setSections(response.data); // Assuming response.data contains an array of sections
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error fetching Sections:', err);
      setError('Failed to fetch Sections. Please try again later.');
    } finally {
      setIsLoading(false); // Stop loading regardless of success or error
    }
  };

  useEffect(() => {
    if (isHovered && !isFetchedRef.current) {
      fetchSections();
      isFetchedRef.current = true;
    }
  }, [isHovered]);

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
            <Link to="/admin/Pages" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faTags} className="icon" />
              <span className="title">Pages</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/Templates" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faTags} className="icon" />
              <span className="title">Templates</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/SectionsLayouts" onClick={closeSidenav}>
              <FontAwesomeIcon icon={faTags} className="icon" />
              <span className="title">SectionsLayouts</span>
            </Link>
          </li>
          <li>
            <div className="profile-dropdown-containerr">
              <div
                onClick={() => setIsHovered((prev) => !prev)} // Toggle dropdown on click
                className="dropdown-toggle"
              >
                <Link to="/admin/HomepageSections" onClick={closeSidenav}>
                  <FontAwesomeIcon icon={faTags} className="icon" />
                  <span className="title">HomepageSections</span>
                </Link>
              </div>
              <div className={`dropdown-menuuu ${isHovered ? "open" : ""}`}>
                {isHovered && !isLoading && sections.length > 0 && (
                  <div className="dynamic-sections">
                    {sections.map((section) => (
                      <Link
                        key={section.id}
                        to={`/admin/HomepageSection/Edit/${section._id}`}
                        className="dropdown-itemmm"
                      >
                        <span className="dropdown-itemmm">{section.Title}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {isLoading && <span className="dropdown-itemmm">Loading...</span>}
                {error && <span className="dropdown-itemmm">{error}</span>}
              </div>
            </div>
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
