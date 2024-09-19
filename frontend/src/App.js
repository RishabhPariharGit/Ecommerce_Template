import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebsiteRoutes from './Routes/WebsiteRoutes';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
