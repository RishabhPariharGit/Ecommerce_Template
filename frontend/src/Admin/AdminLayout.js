import React, { useState } from 'react';
import Sidenav from './Sidenav';
import './AdminStyle/AdminGlobalStyle.css';
import Navbar from './AdminComponents/Navbar';


const AdminLayout = ({ children }) => {
    const [sidenavOpen, setSidenavOpen] = useState(window.innerWidth >= 768);

    const toggleSidenav = () => {
      setSidenavOpen((prev) => !prev);
    };
    return (
        <div className="body">
            <div className='wrapper' id='wrapper'>
                <Sidenav isOpen={sidenavOpen} toggleSidenav={toggleSidenav}/>
       
                <div className="main-Content ">
                <Navbar toggleSidenav={toggleSidenav} />
              
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
