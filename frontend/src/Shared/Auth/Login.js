import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../Services/AuthService';
import Cookies from 'js-cookie';

import './Login.css';

export default function Login() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    debugger
    event.preventDefault();
  
    try {
      const response = await loginUser({ Username, Password });
      if (response.status === 200) {      
        alert("Login successful");
  
        const role = Cookies.get('role'); // Get the role from the cookie
        const token = Cookies.get('token');
        if (role === 'SystemAdmin') {
          navigate('/admin/panel'); // Redirect SystemAdmin to the panel
        } else if (role === 'Admin'||role==="SystemAdmin") {
          navigate('/admin/dashboard'); // Redirect Admin to the dashboard
        } else {
          navigate('/not-authorized'); // Redirect to not-authorized if the user has no role
        }
      } else {
        alert(`Login failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: An error occurred');
    }
  };
  

  return (
    <div className="log-container">
      <div className="form-container">
        <img
          className="logo"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="title">
          Sign in to your account
        </h2>
      </div>

      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="input"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input"
              />
            </div>
          </div>

          <div className="button-wrapper">
            <button type="submit" className="submit-button">
              Login
            </button>
          </div>
        </form>
        <p className="footer-text">
          Not a member?{' '}
          <Link to="/signup"><strong>Sign up</strong></Link>
        </p>
      </div>
    </div>
  );
}
