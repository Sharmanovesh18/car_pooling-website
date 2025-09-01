import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container grid grid--footer">
        <div className="logo-col">
          <a href="#" className="footer-logo">
            <img src="logo.jpg" className="logo" alt="saarthi logo" />
          </a>

          <ul className="social-links">
            <li>
              <a href="#" className="footer-link">
                <FaInstagram className="social-icons" />
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                <FaFacebook className="social-icons" />
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                <FaYoutube className="social-icons" />
              </a>
            </li>
          </ul>

          <p className="copyright">
            Copyright &copy; {year} SAARTHI. 
          </p>
        </div>

        <div className="address-col">
          <p className="footer-h">Contact us</p>
          <address className="contact">
            <p className="address">623 Urban Estate, Gurugram, Haryana</p>
            <a href="tel:415-201-6370" className="footer-link">
              951-201-6370
            </a>
            <a href="mailto:hello@hungryHive.com" className="footer-link">
              hello@saarthi.com
            </a>
          </address>
        </div>

        <div className="nav-col">
          <p className="footer-h">Account</p>
          <ul className="footer-nav">
            <li>
              <a href="#" className="footer-link">Create Account</a>
            </li>
            <li>
              <a href="#" className="footer-link">Sign In</a>
            </li>
            <li>
              <a href="#" className="footer-link">iOS App</a>
            </li>
            <li>
              <a href="#" className="footer-link">Android App</a>
            </li>
          </ul>
        </div>

        <div className="nav-col">
          <p className="footer-h">Company</p>
          <ul className="footer-nav">
            
            <li>
              <a href="#" className="footer-link">For Business</a>
            </li>
            <li>
              <a href="#" className="footer-link">Our Partners</a>
            </li>
            <li>
              <a href="#" className="footer-link">Help Centre</a>
            </li>
            <li>
              <a href="#" className="footer-link">Privacy & Terms</a>
            </li>
          </ul>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
