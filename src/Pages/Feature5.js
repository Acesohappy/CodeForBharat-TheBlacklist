import React, { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../Components/BottomNav";
import "../App.css";

const Feature5 = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");

  const safetyCategories = [
    { id: "general", name: "General Safety" },
    { id: "travel", name: "Travel Safety" },
    { id: "self-defense", name: "Self-Defense" },
    { id: "digital", name: "Digital Safety" },
  ];

  const safetyTips = {
    general: [
      {
        icon: "🔍",
        title: "Stay Alert",
        description: "Be aware of your surroundings and trust your instincts",
      },
      {
        icon: "📱",
        title: "Keep Phone Ready",
        description: "Have emergency numbers saved and phone charged",
      },
      {
        icon: "👥",
        title: "Travel in Groups",
        description: "When possible, travel with friends or family",
      },
      {
        icon: "💡",
        title: "Well-lit Areas",
        description: "Stick to well-lit and populated areas",
      },
    ],
    travel: [
      {
        icon: "🚗",
        title: "Safe Transportation",
        description: "Use trusted transport services and share ride details",
      },
      {
        icon: "🗺️",
        title: "Plan Routes",
        description: "Plan your route in advance and share with trusted contacts",
      },
      {
        icon: "📱",
        title: "Location Sharing",
        description: "Share your location with trusted contacts during travel",
      },
      {
        icon: "🚌",
        title: "Public Transport",
        description: "Use well-lit bus stops and train stations",
      },
    ],
    "self-defense": [
      {
        icon: "🦶",
        title: "Basic Stances",
        description: "Learn and practice basic self-defense stances",
      },
      {
        icon: "👆",
        title: "Pressure Points",
        description: "Know key pressure points for self-defense",
      },
      {
        icon: "💪",
        title: "Escape Techniques",
        description: "Practice escape and release techniques",
      },
      {
        icon: "🗣️",
        title: "Verbal Defense",
        description: "Learn assertive communication and boundary setting",
      },
    ],
    digital: [
      {
        icon: "🔒",
        title: "Password Security",
        description: "Use strong passwords and enable two-factor authentication",
      },
      {
        icon: "🌐",
        title: "Online Privacy",
        description: "Be cautious with personal information online",
      },
      {
        icon: "📱",
        title: "App Safety",
        description: "Review app permissions and privacy settings",
      },
      {
        icon: "🔍",
        title: "Digital Footprint",
        description: "Regularly check and manage your online presence",
      },
    ],
  };

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
        <img src="/profile.jpg" alt="Profile" className="profile" />
      </div>

      <div className="feature-container">
        <h1 className="feature-title">Educational Resources</h1>
        <p className="feature-subtitle">
          Learn essential safety tips and self-defense techniques
        </p>

        <div className="safety-tips-section">
          <div className="category-navigation">
            {safetyCategories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="tips-grid">
            {safetyTips[selectedCategory].map((tip, index) => (
              <div key={index} className="safety-tip-card">
                <div className="tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="emergency-resources">
          <h2>Emergency Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Emergency Numbers</h3>
              <ul>
                <li>Police: 100</li>
                <li>Women's Helpline: 1091</li>
                <li>Ambulance: 108</li>
                <li>Emergency: 112</li>
              </ul>
            </div>
            <div className="resource-card">
              <h3>Safety Apps</h3>
              <ul>
                <li>Emergency SOS</li>
                <li>Location Sharing</li>
                <li>Safe Route Planning</li>
                <li>Community Support</li>
              </ul>
            </div>
            <div className="resource-card">
              <h3>Support Services</h3>
              <ul>
                <li>Women's Helpline</li>
                <li>Legal Aid</li>
                <li>Counseling</li>
                <li>Emergency Shelter</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="safety-checklist">
          <h2>Daily Safety Checklist</h2>
          <div className="checklist-items">
            <div className="checklist-item">
              <input type="checkbox" id="phone" />
              <label htmlFor="phone">Phone charged and emergency numbers ready</label>
            </div>
            <div className="checklist-item">
              <input type="checkbox" id="location" />
              <label htmlFor="location">Location shared with trusted contacts</label>
            </div>
            <div className="checklist-item">
              <input type="checkbox" id="route" />
              <label htmlFor="route">Safe route planned for travel</label>
            </div>
            <div className="checklist-item">
              <input type="checkbox" id="defense" />
              <label htmlFor="defense">Practiced self-defense techniques</label>
            </div>
            <div className="checklist-item">
              <input type="checkbox" id="devices" />
              <label htmlFor="devices">Checked personal safety devices</label>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />

    </div>
  );
};

export default Feature5;
