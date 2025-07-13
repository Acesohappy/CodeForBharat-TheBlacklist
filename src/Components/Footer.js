import React from "react";
import "../Components/Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="logo">EmpowerHer</h3>
          <p className="description">
            EmpowerHer is a women's safety app aims to make 
            public and private spaces safer, especially for 
            women, through the use of crowdsourced data and 
            technology.
          </p>
        </div>
        <div className="footer-right">
          <div className="footer-column get-involved">
            <h4>Get Involved</h4>
            <ul>
              <li><a href="/donate">Donate</a></li>
              <li><a href="/report">Report</a></li>
              <li><a href="/work-with-us">Work with Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-column get-informed">
            <h4>Get Informed</h4>
            <p>
              Subscribe to our emails to discover more about our 
              initiatives and find out how you can drive impactful 
              change.
            </p>
            <div className="subscribe-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
              />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;