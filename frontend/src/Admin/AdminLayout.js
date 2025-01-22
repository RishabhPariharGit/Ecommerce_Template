import React, { useState } from 'react';
import Sidenav from './Sidenav';
import './AdminStyle/AdminGlobalStyle.css';
import Navbar from './AdminComponents/Navbar/Navbar';

const AdminLayout = ({ children }) => {
    const [isSidenavVisible, setIsSidenavVisible] = useState(true); // State to manage sidenav visibility

    const toggleSidenav = () => {
        debugger
        setIsSidenavVisible((prev) => !prev); // Toggle sidenav visibility
    };

    return (
        <div className="body">
            <div className={`wrapper ${isSidenavVisible ? 'sidenav-visible' : 'sidenav-hidden'}`} id="wrapper">
                <Sidenav />
                <div className="main-Content">
                    <Navbar toggleSidenav={toggleSidenav} /> {/* Pass toggle function to Navbar */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
