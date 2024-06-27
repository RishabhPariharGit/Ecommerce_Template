// import ReactDOM from "react-dom/client";
import {  Routes, Route } from "react-router-dom";
import SignUp from "../web_components/auth/signup/signup";
import LogIn from "../web_components/auth/login/login";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import RoomOwners from "../pages/Clients/RoomOwners/RoomOwners";
import Buyers from "../pages/Clients/Buyers/Buyers";
import Teanents from "../pages/Clients/Teanents/Teanents";
import About from "../pages/About/About";
import Blog from "../pages/Blog/Blog";

export default function AuthRoutes() {
  return (
  
      <Routes>
      <Route path="/" element={<Home />}/>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/roomowner" element={< RoomOwners/>} />
        <Route path="/buyer" element={<Buyers />} />
        <Route path="/tenant" element={<Teanents />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
  );
}