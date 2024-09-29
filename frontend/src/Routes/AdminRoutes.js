import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../Admin/Admin Dashboard/AdminDashboard'
import AdminPanel from '../Admin/HomeBannerChanges';
import TextOverImageData from '../Admin/TextOverImageData';
import AuthGuard from '../Services/AuthGuard';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Both Admin and SystemAdmin can access the dashboard */}
      <Route 
       path="/dashboard" 
        element={
          <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
            <AdminDashboard />
          </AuthGuard>
        } 
      />

      {/* Only SystemAdmin can access the panel */}
      <Route 
        path="/panel" 
        element={
          <AuthGuard allowedRoles={['SystemAdmin']}>
            <AdminPanel />
          </AuthGuard>
        } 
      />

      {/* Both Admin and SystemAdmin can access TextOverImageData */}
      <Route 
        path="/textoverimagedata" 
        element={
          <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
            <TextOverImageData />
          </AuthGuard>
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
