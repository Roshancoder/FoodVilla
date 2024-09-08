import React from "react";
import "./footer.css";

const Footer = () =>{ 
    (
  <footer className="footer">
    <div className="footer-content">
      <h4>Foodvilla &#169; 2023</h4>
      <ul className="footer-links">
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact Us</a></li>
        <li><a href="#privacy">Privacy Policy</a></li>
        <li><a href="#terms">Terms of Service</a></li>
      </ul>
    </div>
    <div className="social-media">
      <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
    </div>
  </footer>
)};

export default Footer;
