import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WebsiteRoutes from './Routes/WebsiteRoutes';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  return (
    <Router>
      <Switch>
        {/* Public Routes for Website */}
        <WebsiteRoutes />     
        {/* Protected Routes for Admin */}
        <AdminRoutes />
        {/* Catch-all Route for 404 */}
        <Route path="*">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
