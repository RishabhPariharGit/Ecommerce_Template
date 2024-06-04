// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../components/auth/signup/signup";
import LogIn from "../components/auth/login/login";

export default function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />}/>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}