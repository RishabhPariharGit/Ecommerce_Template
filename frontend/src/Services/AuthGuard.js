import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuard = ({ children, allowedRoles }) => {
    debugger
  const token = Cookies.get('token');
  const role = Cookies.get('role'); // Fetch role from the cookie

  if (!token) {
    // If the token doesn't exist, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the role doesn't match any of the allowed roles, block access
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />; // Redirect to a 'Not Authorized' page or default page
  }

  // If the token and role are valid, render the protected route
  return children;
};

export default AuthGuard;
