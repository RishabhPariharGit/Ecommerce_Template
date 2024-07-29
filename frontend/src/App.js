import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthRoutes from './website/Routes/authroutes';
import Navbar from './website/web_components/navbar/Navbar';
import Footer from './website/web_components/Footer/Footer';
import './App.css';

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation();
  const hideHeaderFooterRoutes = ['/admin','/sign-up','/admindashboard']; // Add any other routes you want to exclude header and footer

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    // Check token on mount
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);


  return (
    <>
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Navbar />}
      <AuthRoutes token={token} setToken={setToken} logout={logout}/>
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
