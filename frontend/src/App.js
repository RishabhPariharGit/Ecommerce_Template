import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebsiteRoutes from './Routes/WebsiteRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import LoginForm from '../src/Admin/AdminLoginForm/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/*" 
          element={
            <WishlistProvider>
            <CartProvider>
              <WebsiteRoutes />
            </CartProvider>
            </WishlistProvider>
          } 
        />
            {/* Admin login route - should not use AdminLayout */}
            <Route path="/admin/login" element={<LoginForm />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
