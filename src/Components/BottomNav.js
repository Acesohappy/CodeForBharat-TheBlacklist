import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/feature2', label: 'Crime Heatmap', icon: '🔥' },
    { path: '/feature3', label: 'Safe Routes', icon: '🗺️' },
    { path: '/feature4', label: 'Community', icon: '👥' }
  ];

  const handleSOS = () => {
    // Add SOS functionality here
    alert('SOS Alert Sent! Emergency services have been notified.');
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => (
        <React.Fragment key={item.path}>
          <Link
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
          {index === 1 && (
            <button className="sos-button" onClick={handleSOS}>
              <span className="nav-icon">🚨</span>
              <span className="nav-label">SOS</span>
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BottomNav;