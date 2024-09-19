import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../Admin/Admin Dashboard/AdminDashboard';
import AdminPanel from '../Admin/HomeBannerChanges';
import TextOverImageData from '../Admin/TextOverImageData';
import AuthGuard from '../Services/AuthGuard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/dashboard" 
        element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        } 
      />
      <Route 
        path="/panel" 
        element={
          <AuthGuard>
            <AdminPanel />
          </AuthGuard>
        } 
      />
      <Route 
        path="/textoverimagedata" 
        element={
          <AuthGuard>
            <TextOverImageData />
          </AuthGuard>
        } 
      />
    </Routes>
  );
};

export default AdminRoutes;
