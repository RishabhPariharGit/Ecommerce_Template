import React from 'react'
import './AdminDashboard.css'
import { Link } from 'react-router-dom'
import Home from '../../website/pages/Home/Home'


const AdminDashboard = () => {
  return (
  <>
  <div className='main-admin-wrapper'>
    <div className='Side-Navigation'>
      <div className='Admin-logo'>
        <Link to={"/"}><p>CUSTOMLOGO</p></Link>
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
  )
}

export default AdminDashboard