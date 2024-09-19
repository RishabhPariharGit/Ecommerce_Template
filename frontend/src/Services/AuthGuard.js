import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuard = ({ children }) => {
    debugger
  const token = Cookies.get('token');

  if (!token) {
    // If the token doesn't exist, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the protected route
  return children;
};

export default AuthGuard;
