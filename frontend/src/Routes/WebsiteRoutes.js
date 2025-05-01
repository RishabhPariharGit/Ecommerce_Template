import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../Websites/Auth/AuthPages/Signup/SignUp';
import LogIn from '../Websites/Auth/AuthPages/Login/Login';
import Home from '../Websites/Pages/Home/Homepg';
import SingleProductpage from '../Websites/Pages/Product/SingleProductpage';
import Contact from '../Websites/Pages/Contact/Contactpg';
import Textoverimage from '../Websites/Website_Components/SecondaryComponents/Textoverimage/Textoverimage';
import MainProductPage from '../Websites/Pages/Collection/Collectionpg'
import UserProfile from '../Websites/Pages/UserProfile/UserProfilepg'
import CartItems from '../Websites/Pages/Cart/Cartpg'
import WishlistItems from '../Websites/Pages/Wishlist/Wishlistpg';
import Address from '../Websites/Pages/Address/Addresspg'
import Layout from '../Websites/Website_Components/Layout/Layout';
import PaymentPage from '../Websites/Pages/PaymentPage/PaymentPage';
import Orders from '../Websites/Pages/Orders/Orders';

const WebsiteRoutes = () => {
  return (
    <Routes>
     <Route path="/" element={<Layout/>}>
     <Route index element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/collections/:slug" element={<MainProductPage />} />
      <Route path="/textoverimage" element={<Textoverimage />} />     
      <Route path="/product/:slug" element={<SingleProductpage />} />
      <Route path="/My/Profile" element={<UserProfile isEditMode={false}/>} />
      <Route path="/My/Profile/Edit" element={<UserProfile isEditMode={true}/>} />
      <Route path="/My/Orders" element={<Orders />} />
      <Route path="/Checkout/cart" element={<CartItems />} />
      <Route path="/Checkout/address" element={<Address />} />
      <Route path="/Wishlist" element={<WishlistItems />} />
      <Route path="/Checkout/payment" element={<PaymentPage />} />
      </Route>
    </Routes>
  );
};

export default WebsiteRoutes;
