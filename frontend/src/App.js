import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthRoutes from './website/Routes/authroutes';
import Navbar from './website/web_components/navbar/Navbar';
import Footer from './website/web_components/Footer/Footer';
import './App.css';

const App = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ['/admin','/sign-up']; // Add any other routes you want to exclude header and footer

  return (
    <>
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Navbar />}
      <AuthRoutes />
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
