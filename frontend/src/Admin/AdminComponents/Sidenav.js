// import React, { useEffect, useState, useRef } from 'react';
// import '../AdminStyle/AdminGlobalStyle.css';
// import Cookies from 'js-cookie';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTachometerAlt, faShoppingCart, faTags, faBoxes, faUsers } from '@fortawesome/free-solid-svg-icons';


// const Sidenav = ({ closeSidenav }) => {
//   const navigate = useNavigate();
//   const [sections, setSections] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isHovered, setIsHovered] = useState(false); // Track hover state
//   const isFetchedRef = useRef(false);






//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('role');
//     navigate('/login');
//   };

//   return (
//     <div>
//       <div className="widedesktop">
//         <div className="top-nav">
//           <div className="hamburger-btn">
//             <div></div>
//             <div></div>
//             <div></div>
//           </div>
//           <div className="top_menu">
//             <div className="logo">
//               <img id="logo" src="https://cdn.worldvectorlogo.com/logos/akasol-1.svg" alt="Logo" height="40" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="sidebar overflow-auto">
//         <div className="desktop">
//           <div className="top_navbar">
//             <div className="top_menu">
//               <div className="logo center" style={{ paddingTop: '25px' }}>
//                 <img id="logo" src="https://cdn.worldvectorlogo.com/logos/akasol-1.svg" alt="Logo" height="45" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <ul style={{ borderTop: 'solid 1px #EEE' }}>
//           <li>
//             <Link to="/admin/dashboard" onClick={closeSidenav}>
//               <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
//               <span className="title">Dashboard</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin/orders" onClick={closeSidenav}>
//               <FontAwesomeIcon icon={faShoppingCart} className="icon" />
//               <span className="title">Orders</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin/Category" onClick={closeSidenav}>
//               <FontAwesomeIcon icon={faTags} className="icon" />
//               <span className="title">Category</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin/SubCategory" onClick={closeSidenav}>
//               <FontAwesomeIcon icon={faBoxes} className="icon" />
//               <span className="title">SubCategory</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin/Products" onClick={closeSidenav}>
//               <FontAwesomeIcon icon={faTags} className="icon" />
//               <span className="title">Products</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin/Announcements" onClick={closeSidenav}>
//               <FontAwesomeIcon icon={faTags} className="icon" />
//               <span className="title">Announcement</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin/ImageSliders" onClick={closeSidenav}>
//               <FontAwesomeIcon icon={faTags} className="icon" />
//               <span className="title">ImageSlider</span>
//             </Link>
//           </li>

//           <li>
//             <Link to="/admin/Users" onClick={closeSidenav}>
//               <FontAwesomeIcon icon={faUsers} className="icon" />
//               <span className="title">Users</span>
//             </Link>
//           </li>
//         </ul>

//         <div className="logout">
//           <div>
//             Logged in as <strong>User Name</strong>
//           </div>
//           <button className='btn logout-btn' onClick={handleLogout}>Logout</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidenav;















import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse,
  Box, Button, Typography
} from '@mui/material';
import {
  Dashboard, ShoppingCart, Category, ExpandLess, ExpandMore,
  SubdirectoryArrowRight, Inventory, Image, Campaign, People
} from '@mui/icons-material';

const Sidenav = ({ closeSidenav }) => {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(false);
  const [OpenSection, setOpenSection] = useState(false);
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    navigate('/admin/login');
  };

  return (
    <div className="sidebar overflow-auto">
      {/* Top Navbar */}


      <div className="logo center" style={{ paddingTop: '15px' }}>
        <img
          id="logo"
          src="https://cdn.worldvectorlogo.com/logos/akasol-1.svg"
          alt="Logo"
          height="45"
        />
      </div>




      {/* Sidebar Navigation */}

      <div className="sidenav-list">
        <List component="nav" >
          <ListItemButton component={Link} to="/admin/dashboard" onClick={closeSidenav} className="sidenav-button">
            <ListItemIcon className="sidenav-icon"><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/orders" onClick={closeSidenav} className="sidenav-button">
            <ListItemIcon className="sidenav-icon"><ShoppingCart /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>

          <ListItemButton onClick={() => setOpenCategory(!openCategory)} className="sidenav-button">
            <ListItemIcon className="sidenav-icon"><Category /></ListItemIcon>
            <ListItemText primary="Category Management" />
            {openCategory ? <ExpandLess className="sidenav-icon" /> : <ExpandMore className="sidenav-icon" />}
          </ListItemButton>

          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to="/admin/Category" onClick={closeSidenav} className="sidenav-button sidenav-subbutton">
                <ListItemIcon className="sidenav-icon"><SubdirectoryArrowRight /></ListItemIcon>
                <ListItemText primary="Category" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/SubCategory" onClick={closeSidenav} className="sidenav-button sidenav-subbutton">
                <ListItemIcon className="sidenav-icon"><SubdirectoryArrowRight /></ListItemIcon>
                <ListItemText primary="SubCategory" />
              </ListItemButton>
            </List>
          </Collapse>

         

          <ListItemButton component={Link} to="/admin/Products" onClick={closeSidenav} className="sidenav-button">
            <ListItemIcon className="sidenav-icon"><Inventory /></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>

          <ListItemButton onClick={() => setOpenSection(!OpenSection)} className="sidenav-button">
            <ListItemIcon className="sidenav-icon"><Category /></ListItemIcon>
            <ListItemText primary="Sections Management" />
            {openCategory ? <ExpandLess className="sidenav-icon" /> : <ExpandMore className="sidenav-icon" />}
          </ListItemButton>

          <Collapse in={OpenSection} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to="/admin/Announcements" onClick={closeSidenav} className="sidenav-button sidenav-subbutton">
                <ListItemIcon className="sidenav-icon"><SubdirectoryArrowRight /></ListItemIcon>
                <ListItemText primary="Announcement" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/ImageSliders" onClick={closeSidenav} className="sidenav-button sidenav-subbutton">
                <ListItemIcon className="sidenav-icon"><SubdirectoryArrowRight /></ListItemIcon>
                <ListItemText primary="ImageSlider" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/ScrollingTexts" onClick={closeSidenav} className="sidenav-button sidenav-subbutton">
                <ListItemIcon className="sidenav-icon"><SubdirectoryArrowRight /></ListItemIcon>
                <ListItemText primary="ScrollingText" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/Usps" onClick={closeSidenav} className="sidenav-button sidenav-subbutton">
                <ListItemIcon className="sidenav-icon"><SubdirectoryArrowRight /></ListItemIcon>
                <ListItemText primary="Usps" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/ScrollingVideos" onClick={closeSidenav} className="sidenav-button sidenav-subbutton">
                <ListItemIcon className="sidenav-icon"><SubdirectoryArrowRight /></ListItemIcon>
                <ListItemText primary="ScrollingVideos" />
              </ListItemButton>
            </List>
          </Collapse>


          <ListItemButton component={Link} to="/admin/Collections" onClick={closeSidenav} className="sidenav-button">
            <ListItemIcon className="sidenav-icon"><Inventory /></ListItemIcon>
            <ListItemText primary="Collections" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/Policies" onClick={closeSidenav} className="sidenav-button">
            <ListItemIcon className="sidenav-icon"><Inventory /></ListItemIcon>
            <ListItemText primary="Policy" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/Users" onClick={closeSidenav} className="sidenav-button">
            <ListItemIcon className="sidenav-icon"><People /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>


        {/* Logout */}
        <Box sx={{ px: 2, pt: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: 'common.white' }}>
            Logged in as <strong>User Name</strong>
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleLogout}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'white',
              }
            }}
          >
            Logout
          </Button>
        </Box>


      </div>

    </div>
  );
};

export default Sidenav;

