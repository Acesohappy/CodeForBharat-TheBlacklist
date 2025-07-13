import React from "react";
import { Link } from "react-router-dom";
import Box from "../Components/Box";  
import SOSButton from "../Components/SOSButton";
import Footer from "../Components/Footer";
import Headline from "../Components/Headline";
import Logo from "../Components/Logo";
import BottomNav from "../Components/BottomNav";
import "../App.css";

const Home = () => {
  const features = [
    {
      title: "Safety Checkpoints",
      icon: "🏠",
      link: "/feature1",
    },
    {
      title: "Crime Heatmaps",
      icon: "🔥",
      link: "/feature2",
    },
    {
      title: "Safe Routes",
      icon: "🗺️",
      link: "/feature3",
    },
    {
      title: "Community Support",
      icon: "👥",
      link: "/feature4",
    },
    {
      title: "Educational Resources",
      icon: "💡",
      link: "/feature5",
    },
    {
      title: "Helpline Numbers",
      icon: "📞",
      link: "/helpline",
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <div className="logo-container">
          <div className="logo-icon">EH</div>
          <div className="logo-text">
            <span className="logo-brand">Empower</span>
            <span className="logo-brand-accent">Her</span>
          </div>
        </div>
        <img src="/profile.jpg" alt="Profile" className="profile" />
      </div>      

      <Headline />
        
      <div className="box-container">
        <Link to="/feature1" className="box">
          <div className="box-icon">🏠</div>
          <div className="box-text">Safety Checkpoints</div>
        </Link>
        <Link to="/feature2" className="box">
          <div className="box-icon">🔥</div>
          <div className="box-text">Crime Heatmaps</div>
        </Link>
        <Link to="/feature3" className="box">
          <div className="box-icon">🗺️</div>
          <div className="box-text">Safe Routes</div>
        </Link>
        <Link to="/feature4" className="box">
          <div className="box-icon">👥</div>
          <div className="box-text">Community Support</div>
        </Link>
        <Link to="/feature5" className="box">
          <div className="box-icon">💡</div>
          <div className="box-text">Educational Resources</div>
        </Link>
        <Link to="/helpline" className="box">
          <div className="box-icon">📞</div>
          <div className="box-text">Helpline</div>
        </Link>
      </div>

      <div id="sos-section">
        <SOSButton />
      </div>

      <BottomNav />

      <Footer />  
    </div>
  );
}

export default Home;
