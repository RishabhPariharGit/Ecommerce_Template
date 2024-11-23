import React from 'react';
import '../AdminStyle/AdminGlobalStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBox, faDollarSign, faUsers, faClipboard, faChartLine } from '@fortawesome/free-solid-svg-icons';

const DashboardCards = () => {
  // Dummy data
  const data = {
    totalSales: 1200,
    totalOrders: 350,
    totalRevenue: 24500,
    totalCustomers: 850,
    totalProducts: 540,
    totalProfit: 12000
  };

  return (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <FontAwesomeIcon icon={faShoppingCart} className="card-icon" />
      <div className="dashboard-card-content">

        <h3>Total Sales</h3>
        <p>{data.totalSales}</p>
        </div>
      </div>
      <div className="dashboard-card">
        <FontAwesomeIcon icon={faClipboard} className="card-icon" />

      <div className="dashboard-card-content">

        <h3>Total Orders</h3>
        <p>{data.totalOrders}</p>
        </div>
      </div>
      <div className="dashboard-card">
        <FontAwesomeIcon icon={faDollarSign} className="card-icon" />
      <div className="dashboard-card-content">

        <h3>Total Revenue</h3>
        <p>${data.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="dashboard-card">
        <FontAwesomeIcon icon={faUsers} className="card-icon" />
      <div className="dashboard-card-content">

        <h3>Total Customers</h3>
        <p>{data.totalCustomers}</p>
        </div>
      </div>
      {/* <div className="dashboard-card">
        <FontAwesomeIcon icon={faBox} className="card-icon" />
      <div className="dashboard-card-content">

        <h3>Total Products</h3>
        <p>{data.totalProducts}</p>
        </div>
      </div>
      <div className="dashboard-card">
        <FontAwesomeIcon icon={faChartLine} className="card-icon" />
      <div className="dashboard-card-content">

        <h3>Total Profit</h3>
        <p>${data.totalProfit.toLocaleString()}</p>
      </div>
      </div> */}
    </div>
  );
};

export default DashboardCards;


