// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../web_components/auth/signup/signup";
import LogIn from "../web_components/auth/login/login";
import Home from "../pages/Home/Home";
import RoomOwners from "../pages/Clients/RoomOwners";
import Buyers from "../pages/Clients/Buyers";
import Teanents from "../pages/Clients/Teanents";

export default function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}/>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/roomowner" element={<RoomOwners />} />
        <Route path="/buyer" element={<Buyers />} />
        <Route path="/teanent" element={<Teanents />} />

      </Routes>
    </BrowserRouter>
  );
}