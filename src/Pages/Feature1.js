import React, { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../Components/BottomNav";
import "../App.css";

const Feature1 = () => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);

  const safetyCheckpoints = [
    {
      id: 1,
      name: "Police Stations",
      icon: "👮",
      description: "Emergency police assistance and support centers",
      details: [
        {
          name: "Central Police Station",
          address: "123 Main Street, City Center",
          phone: "100",
          services: "24/7 Emergency Response, Women's Help Desk, FIR Registration",
          distance: "2.5 km"
        },
        {
          name: "Women's Police Station",
          address: "45 Safety Avenue, Downtown",
          phone: "1091",
          services: "Women's Safety Cell, Domestic Violence Support, Legal Aid",
          distance: "3.8 km"
        },
        {
          name: "North District Police Station",
          address: "78 Security Road, North Area",
          phone: "100",
          services: "Emergency Response, Crime Prevention Unit, Community Policing",
          distance: "5.2 km"
        }
      ]
    },
    {
      id: 2,
      name: "Safe Houses",
      icon: "🏠",
      description: "Temporary shelter and protection centers",
      details: [
        {
          name: "Women's Protection Center",
          address: "90 Shelter Street, Safe Zone",
          phone: "1800-XXX-XXXX",
          services: "Emergency Shelter, Counseling, Legal Support",
          distance: "4.1 km"
        },
        {
          name: "Family Support Center",
          address: "67 Care Lane, Residential Area",
          phone: "1800-XXX-XXXX",
          services: "Family Counseling, Child Protection, Medical Support",
          distance: "3.5 km"
        }
      ]
    },
    {
      id: 3,
      name: "Medical Centers",
      icon: "🏥",
      description: "24/7 emergency medical facilities",
      details: [
        {
          name: "City General Hospital",
          address: "34 Health Avenue, Medical District",
          phone: "108",
          services: "Emergency Care, Trauma Center, Women's Health Unit",
          distance: "2.8 km"
        },
        {
          name: "Community Health Center",
          address: "56 Wellness Road, Local Area",
          phone: "108",
          services: "Primary Care, Emergency Services, Women's Health Clinic",
          distance: "1.9 km"
        }
      ]
    },
    {
      id: 4,
      name: "Community Centers",
      icon: "🏛️",
      description: "Local support and assistance centers",
      details: [
        {
          name: "Women's Empowerment Center",
          address: "89 Support Street, Community Area",
          phone: "1800-XXX-XXXX",
          services: "Skill Development, Legal Aid, Counseling",
          distance: "3.2 km"
        },
        {
          name: "Community Support Hub",
          address: "23 Unity Road, Local District",
          phone: "1800-XXX-XXXX",
          services: "Community Programs, Support Groups, Emergency Assistance",
          distance: "2.7 km"
        }
      ]
    },
    {
      id: 5,
      name: "Public Transport Hubs",
      icon: "🚌",
      description: "Safe transportation centers",
      details: [
        {
          name: "Central Bus Terminal",
          address: "12 Transit Road, Transport Area",
          phone: "1800-XXX-XXXX",
          services: "24/7 Security, Women's Waiting Area, Emergency Help Desk",
          distance: "4.5 km"
        },
        {
          name: "Metro Station",
          address: "78 Rail Street, Metro Area",
          phone: "1800-XXX-XXXX",
          services: "Metro Security, Women's Coach, Emergency Response",
          distance: "3.9 km"
        }
      ]
    },
    {
      id: 6,
      name: "Shopping Areas",
      icon: "🛍️",
      description: "Well-lit and secure shopping zones",
      details: [
        {
          name: "City Mall",
          address: "45 Shop Street, Commercial Area",
          phone: "1800-XXX-XXXX",
          services: "Security Personnel, CCTV Surveillance, Emergency Exit",
          distance: "2.3 km"
        },
        {
          name: "Local Market",
          address: "67 Market Road, Shopping District",
          phone: "1800-XXX-XXXX",
          services: "Police Beat, Security Guards, Emergency Help Points",
          distance: "1.8 km"
        }
      ]
    }
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
        <img src="/profile.jpg" alt="Profile" className="profile" />
      </div>

      <div className="feature-container">
        <h1 className="feature-title">Safety Checkpoints</h1>
        <p className="feature-subtitle">
          Find nearby safe locations and emergency support centers
        </p>

        <div className="checkpoints-grid">
          {safetyCheckpoints.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className={`checkpoint-card ${
                selectedCheckpoint === checkpoint.id ? "active" : ""
              }`}
              onClick={() => setSelectedCheckpoint(selectedCheckpoint === checkpoint.id ? null : checkpoint.id)}
            >
              <div className="checkpoint-icon">{checkpoint.icon}</div>
              <h3>{checkpoint.name}</h3>
              <p>{checkpoint.description}</p>
              {selectedCheckpoint === checkpoint.id && (
                <div className="checkpoint-details">
                  {checkpoint.details.map((detail, index) => (
                    <div key={index} className="detail-item">
                      <h4>{detail.name}</h4>
                      <p><strong>Address:</strong> {detail.address}</p>
                      <p><strong>Phone:</strong> {detail.phone}</p>
                      <p><strong>Services:</strong> {detail.services}</p>
                      <p><strong>Distance:</strong> {detail.distance}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="emergency-info">
          <h2>Emergency Information</h2>
          <div className="emergency-grid">
            <div className="emergency-card">
              <h3>Emergency Numbers</h3>
              <ul>
                <li>Police: 100</li>
                <li>Women's Helpline: 1091</li>
                <li>Ambulance: 108</li>
                <li>Emergency: 112</li>
              </ul>
            </div>
            <div className="emergency-card">
              <h3>Quick Actions</h3>
              <ul>
                <li>Share Location</li>
                <li>Call Emergency</li>
                <li>Alert Contacts</li>
                <li>Find Safe Route</li>
              </ul>
            </div>
            <div className="emergency-card">
              <h3>Safety Tips</h3>
              <ul>
                <li>Stay in Well-lit Areas</li>
                <li>Keep Emergency Numbers Ready</li>
                <li>Share Your Location</li>
                <li>Trust Your Instincts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />

    </div>
  );
};

export default Feature1;
