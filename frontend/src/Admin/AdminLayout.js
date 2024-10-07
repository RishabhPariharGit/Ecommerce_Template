import React from 'react';
import Sidenav from './Sidenav';
import './AdminStyle/AdminGlobalStyle.css';

const AdminLayout = ({ children }) => {
    return (
        <div className="body">
            <div className='wrapper' id='wrapper'>
                <Sidenav />
                <div className="main-Content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
