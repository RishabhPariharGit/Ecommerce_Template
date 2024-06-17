import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './signup.css';

export default function SignUp() {

  const [Name, setName] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [IsPropertyOwner, setIsPropertyOwner] = useState(false);
  const [IsSystemAdmin, setIsSystemAdmin] = useState(false);

  const handleSubmit = async (event) => {
    debugger
    event.preventDefault();
    if(password==confirmPassword){
      const response = await axios.post("http://localhost:8080/RegisterUser", {Name, Username, Email, Phone, password, IsPropertyOwner, IsSystemAdmin});
      if(response.status="200"){
        alert("Registration Succesfull")
        resetForm();
      }
    }
  else{
    alert("Password  Not Match")
  }
       

    
     
};


const resetForm = () => {
    setName('');
    setUsername('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setIsPropertyOwner(false);
    setIsSystemAdmin(false);
  
};

  return (
    <div className="container">
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
            <label htmlFor="name" className="label">
              Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="input"
              />
            </div>
          </div>

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
            <label htmlFor="email" className="label">
              Email address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                id="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="input"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="phone" className="label">
              Phone Number
            </label>
            <div className="input-wrapper">
              <input
                type="tel"
                id="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password" className="label">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="input"
              />
            </div>
          </div>

          <div className="input-group checkbox-group">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="IsPropertyOwner"
                checked={IsPropertyOwner}
                onChange={(e) => setIsPropertyOwner(e.target.checked)}
                className="checkbox"
              />
              <label htmlFor="IsPropertyOwner" className="label-checkbox">
                Property Owner
              </label>
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="IsSystemAdmin"
                checked={IsSystemAdmin}
                onChange={(e) => setIsSystemAdmin(e.target.checked)}
                className="checkbox"
              />
              <label htmlFor="IsSystemAdmin" className="label-checkbox">
                System Admin
              </label>
            </div>
          </div>

          <div className="button-wrapper">
            <button type="submit" className="submit-button" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
        <p className="footer-text">
          Already a member?{' '}
          <Link to="/"><strong>Log in</strong></Link>
        </p>
      </div>
    </div>
  );
}
