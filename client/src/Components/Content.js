import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cater from './pages/Cater';
import Footer from "./Footer";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SignOut from "./SignOut";

export default function Content() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cater" element={<Cater />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signout" element={<SignOut />} />
      </Routes>
      <div className="body"></div>
      <Footer />
    </Router>
  );
}
