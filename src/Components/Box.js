import React from 'react';
import { Link } from 'react-router-dom';

const Box = ({ text, path, icon }) => {
  // Default icons for each feature
  const getIcon = (featureText) => {
    const icons = {
      "Feature 1": "🔒",
      "Feature 2": "📱",
      "Feature 3": "👥",
      "Feature 4": "🚨",
      "Feature 5": "💬",
      "Feature 6": "⚙️"
    };
    return icons[featureText] || "✨";
  };

  return (
    <Link to={path} className="box">
      <span className="box-icon">{icon || getIcon(text)}</span>
      <span className="box-text">{text}</span>
    </Link>
  );
};

export default Box;
