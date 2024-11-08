import React, { useEffect } from 'react';
import './AdminStyle/AdminGlobalStyle.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faShoppingCart, faTags, faBoxes, faUsers } from '@fortawesome/free-solid-svg-icons';

const Sidenav = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const toggleSidebar = () => {
            const wrapper = document.querySelector('.wrapper');
            wrapper.classList.toggle('collapseSideBar');
        };

        const handleResize = () => {
            const wrapper = document.querySelector('.wrapper');
            if (window.innerWidth > 1200) {
                wrapper.classList.remove('collapseSideBar');
            }
        };

        const hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', toggleSidebar);

        const links = document.querySelectorAll('.sidebar ul li a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        const dropdowns = document.querySelectorAll('.sidebar-dropdown > a');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function (event) {
                event.preventDefault();
                const submenu = this.nextElementSibling;
                const isActive = this.parentElement.classList.contains('active');

                document.querySelectorAll('.sidebar-submenu').forEach(sub => sub.style.display = 'none');
                document.querySelectorAll('.sidebar-dropdown').forEach(d => d.classList.remove('active'));

                if (!isActive) {
                    submenu.style.display = 'block';
                    this.parentElement.classList.add('active');
                } else {
                    submenu.style.display = 'none';
                    this.parentElement.classList.remove('active');
                }
            });
        });

        window.addEventListener('resize', handleResize);

        return () => {
            hamburger.removeEventListener('click', toggleSidebar);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('role');
        navigate('/login');
    };

    return (
        <div>
            <div className="widedesktop">
                <div className="top_navbar">
                    <div className="hamburger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="top_menu">
                        <div className="logo">
                            <img id="logo" src="https://www.logolynx.com/images/logolynx/56/56afea50b83164e3e272d4ebeccd94fb.png" alt="Logo" height="40" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar overflow-auto">
                <div className="desktop">
                    <div className="top_navbar">
                        <div className="top_menu">
                            <div className="logo center" style={{ paddingTop: '5px' }}>
                                <img id="logo" src="https://www.logolynx.com/images/logolynx/56/56afea50b83164e3e272d4ebeccd94fb.png" alt="Logo" height="40" />
                            </div>
                        </div>
                    </div>
                </div>

                <ul style={{ borderTop: 'solid 1px #EEE' }}>
                    <li>
                        <Link to="/dashboard">
                            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                            <span className="title">Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/Category">
                            <FontAwesomeIcon icon={faTags} className="icon" />
                            <span className="title">Category</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/SubCategory">
                            <FontAwesomeIcon icon={faBoxes} className="icon" />
                            <span className="title">SubCategory</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/Products">
                            <FontAwesomeIcon icon={faTags} className="icon" />
                            <span className="title">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/Users">
                            <FontAwesomeIcon icon={faUsers} className="icon" />
                            <span className="title">Users</span>
                        </Link>
                    </li>
                </ul>

                <div className="logout">
                    <div>
                        Logged in as <strong>User Name</strong>
                    </div>
                    <button className='btn' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Sidenav;
