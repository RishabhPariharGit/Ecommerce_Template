import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../Shared/Auth/SignUp';
import LogIn from '../Shared/Auth/Login';
import Home from '../Website/pages/Home/Home';
import Contact from '../Website/pages/Contact/Contact';
import About from '../Website/pages/About/About';
import Blog from '../Website/pages/Blog/Blog';
import Textoverimage from '../Website/web_components/TextoverImage/Textoverimage';
import MainProductpg from '../Website/pages/Product/MainProductpg';

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product" element={<MainProductpg />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/textoverimage" element={<Textoverimage />} />
    </Routes>
  );
};

export default WebsiteRoutes;
