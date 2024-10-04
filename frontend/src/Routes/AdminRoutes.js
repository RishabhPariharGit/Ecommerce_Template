import React from 'react';
import { Routes, Route } from 'react-router-dom';



import AuthGuard from '../Services/AuthGuard';
import Dashboard from '../Admin/Admin Dashboard/Dashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Both Admin and SystemAdmin can access the dashboard */}
      {/* <Route 
       path="/dashboard" 
        element={
          <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
            <AdminDashboard />
          </AuthGuard>
        } 
      /> */}

     


      <Route 
        path="/Dashboard" 
        element={
        
            <Dashboard />
       
        } 
      />

      {/* Optional: Route for not authorized users */}
      <Route 
        path="/not-authorized" 
        element={<div>You are not authorized to view this page.</div>} 
      />
    </Routes>
  );
};

export default AdminRoutes;
