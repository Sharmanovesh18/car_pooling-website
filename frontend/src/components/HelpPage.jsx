import React from "react";
import "./HelpPage.css";
import { Link } from "react-router-dom";

function HelpPage() {
  return (
    <div className="help-page">
      <section className="help-hero">
        <h1>We're Here to Help</h1>
        <p>Your support team is available 24/7 — just one click away.</p>
      </section>

      <section className="help-grid">
        <div className="help-card">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.FNGFai7G3Ft38MAr6A2WmAHaHa?pid=Api&P=0&h=180"
            alt="Call Support"
            className="help-img"
          />
          <div className="help-content">
            <h2>📞 Call Support</h2>
            <p>Need instant assistance? Call us any time!</p>
            <a href="tel:+919999999999" className="help-btn">Call Now</a>
          </div>
        </div>

        <div className="help-card">
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.Ic6NyyUY6NObGHT8J3keSgHaHa?pid=Api&P=0&h=180"
            alt="Email Support"
            className="help-img"
          />
          <div className="help-content">
            <h2>✉️ Email Support</h2>
            <p>Have a question? Write to us and get a quick reply.</p>
            <a href="mailto:support@saarthi.com" className="help-btn">Send Email</a>
          </div>
        </div>

        <div className="help-card">
          <img
            src="https://media.istockphoto.com/id/649188206/photo/live-chat-technology-concept-woman-hand-pressing-virtual-screen.jpg?b=1&s=170667a&w=0&k=20&c=I_b2_9sHawu3jYR2B4SNIWzZLTgClz_Mkj3JaYKRy6Q="
            alt="Live Chat"
            className="help-img"
          />
          <div className="help-content">
            <h2>💬 Live Chat</h2>
            <p>Chat in real time with our support experts.</p>
            <Link to="#" className="help-btn">Start Chat</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HelpPage;

