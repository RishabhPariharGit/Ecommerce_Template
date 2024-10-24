import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../Shared/Auth/SignUp';
import LogIn from '../Shared/Auth/Login';
import Home from '../Websites/Pages/Home/Home';
import Blog from '../Websites/Pages/Blog/Blog';
import SingleProductpage from '../Websites/Pages/Product/SingleProductpage';
import Contact from '../Websites/Pages/Contact/Contact';
import About from '../Websites/Pages/About/About';
import Textoverimage from '../Websites/Website_Components/Textoverimage/Textoverimage';
import MainProductPage from '../Websites/Pages/MainProductPage/MainProductPage'

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/collections/:slug" element={<MainProductPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/textoverimage" element={<Textoverimage />} />     
      <Route path="/product/:slug" element={<SingleProductpage />} />
    </Routes>
  );
};

export default WebsiteRoutes;
