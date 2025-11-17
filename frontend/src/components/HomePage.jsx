import "./HomePage.css";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom"; // ✅ useLocation imported
import DashBoard from "./DashBoard";
import Footer from "./Footer";
import DiscountCTA from "./Animation";

function HomePage() {
  const [value, setValue] = useState("");

  // ✅ define which paths should hide footer/CTA
  const hideFooterAndCTA = ["/dashboard", "/login", "/register"];

  // ✅ use react-router's location hook
  const location = useLocation();
  const shouldHide = hideFooterAndCTA.includes(location.pathname);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <img
          src="Car1.jpg"
          alt="Car on the road"
          className="hero-image"
        />

        <div className="hero-content">
          <h1>Book a ride, rent a car, or go outstation</h1>
          <p><b>Your trusted travel companion, anytime, anywhere 🚀</b></p>
          <div className="booking-box">

            <h1 className="book-ride">Book your ride</h1>
            <br />
            <select 
              value={value} 
              onChange={(e) => setValue(e.target.value)}
            >
              <option value="" disabled hidden>
                Select an option
              </option>
              <option value="now">Now</option>
              <option value="later">Schedule Later</option>
            </select>

            <p><b>Selected: {value}</b></p>

            {/* ✅ use Link instead of window.location.href */}
            <Link to="/dashboard">
              <button className="search-btn">Search Ride</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-us">
        <h2>Why Choose Us</h2>
        <div className="features">
          <div>✅ Safe and Verified Drivers</div>
          <div>📍 Real-time Tracking</div>
          <div>💳 Multiple Payment Options</div>
          <div
            className="clickable-support"
            onClick={() => { window.location.href = "/help"; }}
            style={{ cursor: "pointer" }}
          >
            🕐 24/7 Support
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="card">🚕 City Rides</div>
          <div className="card">🚌 Outstation Travel</div>
          <div className="card">🚗 Car Rentals</div>
          <div className="card">📦 Parcel Delivery</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="reviews">
          <div className="review">⭐⭐⭐⭐⭐ “Best ride experience ever!”</div>
          <div className="review">⭐⭐⭐⭐ “Affordable and reliable service.”</div>
          <div className="review">⭐⭐⭐⭐⭐ “Very safe for night travel.”</div>
        </div>
      </section>

      {/* Footer */}
      {!shouldHide && (
        <>
          <DiscountCTA />
          <Footer />
        </>
      )}
    </div>
  );
}

export default HomePage;
