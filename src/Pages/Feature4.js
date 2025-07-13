import React, { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../Components/BottomNav";
import "../App.css";

const Feature4 = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const supportGroups = [
    {
      id: 1,
      name: "Women's Safety Support",
      members: 250,
      category: "safety",
      description: "Share experiences and get advice on personal safety",
      topics: ["Self-defense", "Emergency Planning", "Safety Tips"],
    },
    {
      id: 2,
      name: "Legal Support Group",
      members: 180,
      category: "legal",
      description: "Connect with legal experts and get guidance",
      topics: ["Rights", "Legal Procedures", "Documentation"],
    },
    {
      id: 3,
      name: "Mental Health Support",
      members: 300,
      category: "mental health",
      description: "Find emotional support and professional guidance",
      topics: ["Counseling", "Stress Management", "Well-being"],
    },
    {
      id: 4,
      name: "Career Development",
      members: 200,
      category: "career",
      description: "Professional growth and workplace safety",
      topics: ["Job Search", "Workplace Rights", "Networking"],
    },
  ];

  const categories = [
    { id: "all", name: "All Groups" },
    { id: "safety", name: "Safety" },
    { id: "legal", name: "Legal" },
    { id: "mental health", name: "Mental Health" },
    { id: "career", name: "Career" },
  ];

  const filteredGroups = selectedCategory === "all"
    ? supportGroups
    : supportGroups.filter(group => group.category === selectedCategory);

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
        <h1 className="feature-title">Community Support</h1>
        <p className="feature-subtitle">
          Connect with others and find support in your community
        </p>

        <div className="community-section">
          <div className="category-filters">
            {categories.map((category) => (
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

          <div className="support-groups-grid">
            {filteredGroups.map((group) => (
              <div key={group.id} className="support-group-card">
                <div className="group-header">
                  <h3>{group.name}</h3>
                  <span className="member-count">{group.members} members</span>
                </div>
                <p className="group-description">{group.description}</p>
                <div className="group-topics">
                  {group.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
                <button className="join-group-button">Join Group</button>
              </div>
            ))}
          </div>

          <div className="community-features">
            <h2>Community Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>Discussion Forums</h3>
                <p>Engage in meaningful conversations</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>Meetups</h3>
                <p>Connect with others in person</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Resources</h3>
                <p>Access helpful guides and materials</p>
              </div>
            </div>
          </div>

          <div className="community-guidelines">
            <h2>Community Guidelines</h2>
            <ul>
              <li>Respect others' privacy and boundaries</li>
              <li>Share experiences responsibly</li>
              <li>Support and encourage each other</li>
              <li>Report inappropriate behavior</li>
              <li>Follow safety protocols</li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />

      
    </div>
  );
};

export default Feature4;
