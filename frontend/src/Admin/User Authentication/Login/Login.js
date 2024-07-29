import React, { useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';


const LogIn = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = 'dummy_token';
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <>
    <div className='Admin-Login-main-wrapper'>
    <div className='Login-main-cont'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>don't have an account<Link to={'/sign-up'}> sign up</Link></p>
      </div>
      </div>
    </>
  );
};


export default LogIn;
