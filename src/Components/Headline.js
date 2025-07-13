import React from 'react';
import './Headline.css';

const Headline = () => {
  return (
    <div className="headline-container">
      <div className="headline-content">
        <h1 className="headline-title">
          Empowering Women Through Safety & Support
        </h1>
        <p className="headline-subtitle">
          Your safety is our priority. With our SOS feature and emergency contacts, 
          help is just one tap away. Together, we're building a safer world for women.
        </p>
        <a href="#sos-section" className="headline-cta">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Headline; 