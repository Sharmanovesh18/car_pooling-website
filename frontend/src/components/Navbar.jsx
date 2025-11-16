import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
// import logo from "../assets/logo.jpg";
// import Help from "../pages/Help";
// import driver from "../pages/Driver";


function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);

    const handleAuthChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(updatedUser);
    };

    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);

    window.dispatchEvent(new Event("auth-changed"));

    navigate("/login");
  };

  return (
    <header className="NavBar">
      <div className="logo">
        <img src="logo.jpg" alt="Saarthi Logo" className="logo-img" />
        <span className="logo-text">SAARTHI</span>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Rides</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/offers">Offers</Link>
        <Link to="/help" src="Help.jsx">Help</Link>

        <Link to="/contact">Contact</Link>
        <Link to="/location">Location</Link>
        <Link to="/driver">Driver</Link>

      </nav>

      {currentUser ? (
        <div className="profile-dropdown">
          <button className="profile-btn">
            👤 {currentUser.name.split(" ")[0]} ▼
          </button>
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <button className="login-btn">Login / Signup</button>
        </Link>
      )}
    </header>
  );
}

export default Navbar;
