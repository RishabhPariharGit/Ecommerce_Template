import React from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import Home from '../../website/pages/Home/Home';

const AdminDashboard = () => {
  return (
    <>
      <div className='main-admin-wrapper'>
        <div className='Side-Navigation'>
          <div className='Admin-logo'>
            <Link to={"/"}><p>CUSTOMLOGO</p></Link>
          </div>
          <div className='side-nav-links-main-wrapper'>
            <div className='dropdown'>
              <button className="dropbtn">Home</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>

         

            <div className='dropdown'>
              <button className="dropbtn">Services</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>

       
            <div className='dropdown'>
              <button className="dropbtn">About Us</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>


            <div className='dropdown'>
              <button className="dropbtn">Blog</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>

          </div>
        </div>
        <div className='work-wrapper-main'>
          <div className='main-profile-wrapper'>
            <div className='secondary-profile-wrapper'>
            </div>
          </div>
          <div className='main-work-area-wrapper'>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
