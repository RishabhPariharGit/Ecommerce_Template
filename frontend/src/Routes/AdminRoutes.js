import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../Services/AuthGuard';
import CategoryForm from '../Admin/Category/CategoryForm';
import Dashboard from '../Admin/Admin Dashboard/Dashboard';
import AdminLayout from '../Admin/AdminLayout';
import CategoryList from '../Admin/Category/CategoryList';
import SubCategoryList from '../Admin/SubCategory/SubCategoryList';
import SubCategoryForm from '../Admin/SubCategory/SubCategoryForm';
import ProductList from '../Admin/Product/ProductList';
import ProductForm from '../Admin/Product/ProductForm';
import UserList from '../Admin/User/UserList';
import UserForm from '../Admin/User/UserForm';

import AnnouncementList from '../Admin/Announcement/AnnouncementList';
import AnnouncementForm from '../Admin/Announcement/AnnouncementForm';
import ImageSliderList from '../Admin/ImageSlider/ImageSliderList';
import ImageSliderForm from '../Admin/ImageSlider/ImageSliderForm';


const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/Dashboard" element={<AuthGuard allowedRoles={['Admin', 'SystemAdmin']}><Dashboard /> </AuthGuard>} />

        <Route path="/Category/create" element={<AuthGuard allowedRoles={['Admin', 'SystemAdmin']}> <CategoryForm isEditMode={false} /> </AuthGuard>} />
        <Route
          path="/Category/edit/:slug"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <CategoryForm isEditMode={true} />
            </AuthGuard>
          }
        />
        <Route
          path="/Category"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <CategoryList />
            </AuthGuard>
          }
        />
        <Route
          path="/SubCategory/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <SubCategoryForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/SubCategory/Edit/:slug"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <SubCategoryForm isEditMode={true} />
            </AuthGuard>
          }
        />
        <Route
          path="/SubCategory"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <SubCategoryList />
            </AuthGuard>
          }
        />
        <Route
          path="/Products"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ProductList />
            </AuthGuard>
          }
        />
        <Route
          path="/Product/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ProductForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/Product/Edit/:slug"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ProductForm isEditMode={true} />
            </AuthGuard>
          }
        />
        <Route
          path="/Users"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <UserList />
            </AuthGuard>
          }
        />
        <Route
          path="/User/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <UserForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/User/Edit/:Username"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <UserForm isEditMode={true} />
            </AuthGuard>
          }
        />
       
       

        <Route
          path="Announcements"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <AnnouncementList />
            </AuthGuard>
          }
        />
        <Route
          path="/Announcement/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <AnnouncementForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/Announcement/Edit/:Id"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <AnnouncementForm isEditMode={true} />
            </AuthGuard>
          }
        />


        <Route
          path="ImageSliders"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ImageSliderList />
            </AuthGuard>
          }
        />
        <Route
          path="/ImageSlider/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ImageSliderForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/ImageSlider/Edit/:Id"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ImageSliderForm isEditMode={true} />
            </AuthGuard>
          }
        />
        {/* Unauthorized Route */}
        <Route
          path="/not-authorized"
          element={<div>You are not authorized to view this page.</div>}
        />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
