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

{/* Dashboard Route       */}
<Route  path="/Dashboard"  element={<Dashboard /> } />

{/* Catergory Route  */}
<Route path="/Category/create" element={<CategoryForm isEditMode={false} />} />
<Route path="/Category/edit/:slug" element={<CategoryForm isEditMode={true} />} />
<Route  path="/Category"element={<CategoryList />} />

{/* Subcateogry Route  */}
<Route path="/SubCategory/create" element={<SubCategoryForm isEditMode={false} />} />
<Route path="/SubCategory/Edit/:slug" element={<SubCategoryForm isEditMode={true} />} />  
<Route path="/SubCategory"element={<SubCategoryList />} />

{/* Product Route  */}
<Route path="/Products"element={<ProductList />} />
<Route path="/Product/create" element={<ProductForm isEditMode={false} />} />
<Route path="/Product/Edit/:slug" element={<ProductForm isEditMode={true} />} /> 




   



      <Route 
        path="/not-authorized" 
        element={<div>You are not authorized to view this page.</div>} 
      />
    </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
