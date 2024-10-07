import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../Services/AuthGuard';
import Category from '../Admin/Category';
import SubCategory from '../Admin/SubCategory';
import Product from '../Admin/Product';
import Dashboard from '../Admin/Admin Dashboard/Dashboard';
import AdminLayout from '../Admin/AdminLayout';

const AdminRoutes = () => {
  return (
    <AdminLayout>
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
      <Route 
        path="/addCategory" 
        element={
         
            <Category />
         
        } 
      />
 <Route 
        path="/addSubCategory" 
        element={
         
            <SubCategory />
         
        } 
      />
      <Route 
        path="/addProduct" 
        element={
         
            <Product />
         
        } 
      />
      {/* Optional: Route for not authorized users */}
      <Route 
        path="/not-authorized" 
        element={<div>You are not authorized to view this page.</div>} 
      />
    </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
