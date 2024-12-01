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
import UserProfile from '../Websites/Pages/UserProfile/UserProfile'
import CartItems from '../Websites/Pages/CartItems/Cartitems'
import WishlistItems from '../Websites/Pages/WishlistItems/WishlistItems';
import Address from '../Websites/Pages/Address/Address'
import Layout from '../Websites/Website_Components/Layout/Layout';

const WebsiteRoutes = () => {
  return (
    <Routes>
     <Route path="/" element={<Layout/>}>
     <Route index element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/collections/:slug" element={<MainProductPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/textoverimage" element={<Textoverimage />} />     
      <Route path="/product/:slug" element={<SingleProductpage />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/Checkout/cart" element={<CartItems />} />
      <Route path="/Checkout/address" element={<Address />} />
      <Route path="/Wishlist" element={<WishlistItems />} />
      </Route>
    </Routes>
  );
};

export default WebsiteRoutes;
