// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Newhome from '../Navbar/Newhome';
import Announcementbar from '../Announcementbar/Announcementbar';


const Layout = () => {
  return (
    <>
     <Announcementbar/>
      <Newhome/>
      <main>
        <Outlet /> {/* This will render the matched route's component */}
      </main>
    </>
  );
};

export default Layout;
