import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../Services/AdminServices/Allservices/AuthGuard';
import Dashboard from '../Admin/Tabs/AdminDashboard/Dashboard';
import AdminLayout from '../Admin/Layout/AdminLayout';
import CategoryList from '../Admin/Tabs/CategoryManagement/Category/CategoryList';
import CategoryForm from '../Admin/Tabs/CategoryManagement/Category/CategoryForm';
import SubCategoryList from '../Admin/Tabs/CategoryManagement/SubCategory/SubCategoryList';
import SubCategoryForm from '../Admin/Tabs/CategoryManagement/SubCategory/SubCategoryForm';
import ProductList from '../Admin/Tabs/ProductManagement/ProductList';
import ProductForm from '../Admin/Tabs/ProductManagement/ProductForm';
import UserList from '../Admin/Tabs/UserManagement/UserList';
import UserForm from '../Admin/Tabs/UserManagement/UserForm';

import AnnouncementList from '../Admin/Tabs/CMS/Sections/Announcement/AnnouncementList';
import AnnouncementForm from '../Admin/Tabs/CMS/Sections/Announcement/AnnouncementForm';
import ImageSliderList from '../Admin/Tabs/CMS/Sections/ImageSlider/ImageSliderList';
import ImageSliderForm from '../Admin/Tabs/CMS/Sections/ImageSlider/ImageSliderForm';

import ScrollingTextList from '../Admin/Tabs/CMS/Sections/ScrollingText/ScrollingTextList';
import ScrollingTextForm from '../Admin/Tabs/CMS/Sections/ScrollingText/ScrollingTextForm';

import ScrollingVideoList from '../Admin/Tabs/CMS/Sections/ScrollingVideo/ScrollingVideoList';
import ScrollingVideoForm from '../Admin/Tabs/CMS/Sections/ScrollingVideo/ScrollingVideoForm';


import UspsList from '../Admin/Tabs/CMS/Sections/Usps/UspsList';
import UspsForm from '../Admin/Tabs/CMS/Sections/Usps/UspsForm';

import CollectionsList from '../Admin/Tabs/Collections/CollectionsList';
import CollectionsForm from '../Admin/Tabs/Collections/CollectionsForm';

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


        <Route
          path="ScrollingTexts"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ScrollingTextList />
            </AuthGuard>
          }
        />
        <Route
          path="/ScrollingText/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ScrollingTextForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/ScrollingText/Edit/:Id"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ScrollingTextForm isEditMode={true} />
            </AuthGuard>
          }
        />



        <Route
          path="Usps"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <UspsList />
            </AuthGuard>
          }
        />
        <Route
          path="/Usps/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <UspsForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/Usps/Edit/:Id"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <UspsForm isEditMode={true} />
            </AuthGuard>
          }
        />


        <Route
          path="ScrollingVideos"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ScrollingVideoList />
            </AuthGuard>
          }
        />
        <Route
          path="/ScrollingVideo/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ScrollingVideoForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/ScrollingVideo/Edit/:Id"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <ScrollingVideoForm isEditMode={true} />
            </AuthGuard>
          }
        />


        <Route
          path="Collections"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <CollectionsList />
            </AuthGuard>
          }
        />
        <Route
          path="/Collection/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <CollectionsForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/Collection/Edit/:Id"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <CollectionsForm isEditMode={true} />
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
