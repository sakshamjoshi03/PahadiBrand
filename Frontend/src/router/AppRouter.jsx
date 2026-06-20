import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About/About";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default AppRouter;
