import "./HomePage.css";
import { useState } from "react";

function HomePage() {
    const [value, setValue] = useState("");
    return (
        <div className="homepage">
            
            {/* Header */}
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
                        <input type="text" placeholder="Pickup Location" />
                        <input type="text" placeholder="Drop Location" />
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

      <p ><b>Selected: {value}</b></p>

                        <button className="search-btn">Search Ride</button>
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
                    <div>🕐 24/7 Support</div>
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

            {/* Offer Section */}
            <section className="offer">
                <h3>🎁 25% OFF on First Ride</h3>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-links">
                    <a href="#">About Us</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                </div>
                <p>© 2025 Sarthi. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;