import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuard = ({ children, allowedRoles }) => {
    
  const token = Cookies.get('token');
  const role = Cookies.get('role'); 

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />; 
  }
  return children;
};

export default AuthGuard;
