import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Helpline = () => {
  const emergencyContacts = [
    {
      name: "National Women Helpline",
      number: "1091",
      description: "24/7 Emergency Helpline for Women",
      icon: "🚨"
    },
    {
      name: "Police Emergency",
      number: "100",
      description: "General Emergency Services",
      icon: "👮"
    },
    {
      name: "Women's Safety App",
      number: "1800-XXX-XXXX",
      description: "Dedicated Women's Safety Support",
      icon: "📱"
    }
  ];

  const safetyTips = [
    "Share your location with trusted contacts",
    "Keep emergency numbers on speed dial",
    "Use well-lit and populated routes",
    "Trust your instincts and stay alert",
    "Report suspicious activities immediately"
  ];

  return (
    <div className="container">
      <div className="header">
        <Link to="/" className="logo-container">
          <div className="logo-icon">EH</div>
          <div className="logo-text">
            <span className="logo-brand">Empower</span>
            <span className="logo-brand-accent">Her</span>
          </div>
        </Link>
        <img
          src="/profile.jpg"
          alt="Profile"
          className="profile"
        />
      </div>

      <div className="helpline-container">
        <h1 className="helpline-title">Emergency Helpline</h1>
        <p className="helpline-subtitle">24/7 Support for Women's Safety</p>

        <div className="emergency-contacts">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="emergency-contact-card">
              <div className="contact-icon">{contact.icon}</div>
              <h3 className="contact-name">{contact.name}</h3>
              <a href={`tel:${contact.number}`} className="contact-number">
                {contact.number}
              </a>
              <p className="contact-description">{contact.description}</p>
            </div>
          ))}
        </div>

        <div className="safety-tips">
          <h2 className="safety-tips-title">Safety Tips</h2>
          <ul className="safety-tips-list">
            {safetyTips.map((tip, index) => (
              <li key={index} className="safety-tip-item">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="quick-actions">
          <button className="sos-button">SOS Alert</button>
          <button className="share-location-button">Share Location</button>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Empower Her. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Helpline; 