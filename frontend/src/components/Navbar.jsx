import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import DashBoard from "./DashBoard";


function Navbar() {
  return (
    <header className="NavBar">
       <div className="logo">
        <img src="logo.jpg" alt="Sarthi Logo" className="logo-img" />
        <span className="logo-text">SAARTHI</span>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Rides</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="#">Offers</Link>
        <Link to="#">Help</Link>
        <Link to="#">Contact</Link>
      </nav>
       <Link to="/login">
        <button className="login-btn">Login / Signup</button>
      </Link>
    </header>
  );
}

export default Navbar;
