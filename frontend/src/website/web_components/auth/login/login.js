import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';

export default function Login() {

  
  const [Username, setUsername] = useState('');

  const [Password, setPassword] = useState('');
  const navigate = useNavigate() 

  const handleSubmit = async (event) => {
    debugger
    event.preventDefault();
  
      const response = await axios.post("http://localhost:8080/LoginUser", {Username,Password });
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('UserId',response.data.UserId)
        alert('Login successful', 'success');
        navigate('/UserDetails');



      }
  else{
    alert("Password  Not Match")
  }
       

    
     
};


const resetForm = () => {

    setUsername('');

    setPassword('');
   
   
  
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
          Sign up to your account
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
                id="Username"
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
            <button type="submit" className="submit-button" onClick={handleSubmit}>
             Login 
            </button>
          </div>
        </form>
        <p className="footer-text">
          Already a member?{' '}
          <Link to="/"><strong>Sign in</strong></Link>
        </p>
      </div>
    </div>
  );
}
