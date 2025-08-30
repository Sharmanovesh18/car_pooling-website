import React from "react";
import "./Navbar.css"; // we’ll make a separate css for navbar

function Navbar() {
  return (
    <header className="NavBar">
      <div className="logo">🚖 SARTHI</div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Rides</a>
        <a href="#">Rentals</a>
        <a href="#">Offers</a>
        <a href="#">Help</a>
        <a href="#">Contact</a>
      </nav>
      <button className="login-btn">Login / Signup</button>
    </header>
  );
}

export default Navbar;
