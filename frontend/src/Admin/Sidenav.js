import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminStyle/AdminGlobalStyle.css';

const Sidenav = () => {
    useEffect(() => {
        const toggleSidebar = () => {
            const wrapper = document.querySelector('.wrapper');
            wrapper.classList.toggle('collapseSideBar');
        };

        const handleResize = () => {
            const wrapper = document.querySelector('.wrapper');
            if (window.innerWidth > 1200) {
                // Remove collapseSideBar class on large screen
                wrapper.classList.remove('collapseSideBar');
            }
        };

        const hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', toggleSidebar);

        // Handle active link functionality
        const links = document.querySelectorAll('.sidebar ul li a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Handle sidebar dropdown functionality
        const dropdowns = document.querySelectorAll('.sidebar-dropdown > a');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default anchor behavior

                const submenu = this.nextElementSibling;
                const isActive = this.parentElement.classList.contains('active');

                // Close all other dropdowns
                document.querySelectorAll('.sidebar-submenu').forEach(sub => sub.style.display = 'none');
                document.querySelectorAll('.sidebar-dropdown').forEach(d => d.classList.remove('active'));

                // Open the clicked dropdown
                if (!isActive) {
                    submenu.style.display = 'block';
                    this.parentElement.classList.add('active');
                } else {
                    submenu.style.display = 'none';
                    this.parentElement.classList.remove('active');
                }
            });
        });

        // Add resize listener to handle automatic reset on large screens
        window.addEventListener('resize', handleResize);

        // Cleanup event listeners on unmount
        return () => {
            hamburger.removeEventListener('click', toggleSidebar);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {/* Wide Desktop Navbar */}
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

            {/* Sidebar */}
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

                {/* Menu Items */}
                <ul style={{ borderTop: 'solid 1px #EEE' }}>
                    <li>
                        <Link to="/dashboard">
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                            <span className="title">Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/Category">
                            <span className="title">Category</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/SubCategory">
                            <span className="title">SubCategory</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/Products">
                            <span className="title">Products</span>
                        </Link>
                    </li>
                    <li className="sidebar-dropdown">
                        <a href="#" className="space-between-sec">
                            <span><span className="title">Billing</span></span>
                            <span className="arrow-func"></span>
                        </a>
                        <div className="sidebar-submenu" style={{ display: 'none' }}>
                            <ul>
                                <li>
                                    <Link to="/Billing/UnpaidInvoices" id="nav_UnPaidInvoices">
                                        <span className="title">UnPaid Invoices</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Billing/PaidInvoices" id="nav_PaidInvoices">
                                        <span className="title">Paid Invoices</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="/users">
                            <span className="title">Users</span>
                        </Link>
                    </li>
                </ul>

                {/* Logout */}
                <div className="logout">
                    <div>
                        Logged in as <strong>User Name</strong>
                    </div>
                    <Link to="/logout">Log Out</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidenav;
