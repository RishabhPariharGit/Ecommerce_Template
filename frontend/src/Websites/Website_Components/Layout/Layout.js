// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Announcementbar from '../Announcementbar/Announcementbar';
import Navbar from '../../Website_Components/PrimaryComponents/Navbar/Navbar';


const Layout = () => {
  return (
    <>
     <Announcementbar/>
      <Navbar/>
      <main>
        <Outlet /> {/* This will render the matched route's component */}
      </main>
    </>
  );
};

export default Layout;
