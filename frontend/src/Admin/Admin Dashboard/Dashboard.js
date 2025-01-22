import React, { useState, useEffect } from 'react';
import '../AdminStyle/AdminGlobalStyle.css';
import '../AdminStyle/Color.css';

import ResponsiveGrid from '../AdminComponents/ResponsiveGrid';


const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 950) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
    
      <ResponsiveGrid/>
      {/* <div className='main-admin-wrapper'>
    

      <div className='main-side-wrapper'>
      <div className='main-side-upper-wrapper'>

      </div>


      <div className='main-side-lower-wrapper'>
        
        </div>

      </div>
      </div> */}
    </div>
  );
};
export default Dashboard;
