import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from '../../Services/UserService'
import { useNavigate } from "react-router-dom";
import './signup.css';

export default function SignUp() {

  const [Name, setName] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if(Password==confirmPassword){
        const response = await registerUser({ Name, Username, Email, Phone, Password });
      if(response.status="200"){
        alert("Registration Succesfull")
        resetForm();
        navigate('/login');
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
   
  
};

  return (
    <div className="sig-container">
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
                value={Password}
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

       

          <div className="button-wrapper">
            <button type="submit" className="submit-button" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
        <p className="footer-text">
          Already a member?{' '}
          <Link to="/login"><strong>Log in</strong></Link>
        </p>
      </div>
    </div>
  );
}
