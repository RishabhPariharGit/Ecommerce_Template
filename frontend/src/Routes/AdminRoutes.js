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
import HomepageSectionForm from '../Admin/HomepageSections/HomepageSectionForm';
import HomepageSectionList from '../Admin/HomepageSections/HomepageSectionList';
import PagesList from '../Admin/Pages/PagesList';
import PagesForm from '../Admin/Pages/Pagesform';

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
          path="/Pages"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <PagesList />
            </AuthGuard>
          }
        />
           <Route
          path="/Pages/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <PagesForm />
            </AuthGuard>
          }
        />
         <Route
          path="/Page/Edit/:slug"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <PagesForm isEditMode={true} />
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
          path="/HomepageSections"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <HomepageSectionList />
            </AuthGuard>
          }
        />
        <Route
          path="/HomepageSections"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <HomepageSectionList />
            </AuthGuard>
          }
        />
        <Route
          path="/HomepageSection/create"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <HomepageSectionForm isEditMode={false} />
            </AuthGuard>
          }
        />
        <Route
          path="/HomepageSection/Edit/:sectionId"
          element={
            <AuthGuard allowedRoles={['Admin', 'SystemAdmin']}>
              <HomepageSectionForm isEditMode={true}/>
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
