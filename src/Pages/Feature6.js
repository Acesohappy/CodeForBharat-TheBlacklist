import React, { useState, useEffect } from 'react';
import '../App.css';

const Feature6 = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    complaintType: 'general',
    description: '',
    priority: 'medium',
    attachments: []
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('emergency');

  const emergencyContacts = [
    { id: 1, name: 'Police', number: '100', icon: '🚔', description: '24/7 Emergency Response', color: '#FF4B4B' },
    { id: 2, name: 'Ambulance', number: '108', icon: '🚑', description: 'Medical Emergency', color: '#4CAF50' },
    { id: 3, name: 'Fire', number: '101', icon: '🚒', description: 'Fire Emergency', color: '#FF9800' },
    { id: 4, name: 'Women Helpline', number: '1091', icon: '👮', description: 'Women\'s Safety', color: '#9C27B0' }
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      setFormData({
        name: '',
        phone: '',
        location: '',
        complaintType: 'general',
        description: '',
        priority: 'medium',
        attachments: []
      });
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files]
    });
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleShareLocation = () => {
    if (currentLocation) {
      const url = `https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="helpline-container">
      <div className="helpline-header">
        <h1>Emergency Helpline</h1>
        <p>Get immediate help and support when you need it most</p>
      </div>

      <div className="helpline-tabs">
        <button 
          className={`tab-button ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          Emergency Contacts
        </button>
        <button 
          className={`tab-button ${activeTab === 'complaint' ? 'active' : ''}`}
          onClick={() => setActiveTab('complaint')}
        >
          File Complaint
        </button>
        <button 
          className={`tab-button ${activeTab === 'quick' ? 'active' : ''}`}
          onClick={() => setActiveTab('quick')}
        >
          Quick Actions
        </button>
      </div>

      <div className="helpline-content">
        {activeTab === 'emergency' && (
          <div className="emergency-grid">
            {emergencyContacts.map(contact => (
              <div 
                key={contact.id} 
                className="emergency-card"
                style={{ borderColor: contact.color }}
              >
                <div className="emergency-icon-wrapper" style={{ background: contact.color }}>
                  <span className="emergency-icon">{contact.icon}</span>
                </div>
                <h3>{contact.name}</h3>
                <p className="emergency-number">{contact.number}</p>
                <p className="emergency-description">{contact.description}</p>
                <button 
                  className="call-button"
                  onClick={() => handleCall(contact.number)}
                  style={{ background: contact.color }}
                >
                  Call Now
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'complaint' && (
          <div className="complaint-section">
            {showSuccess && (
              <div className="success-message">
                Complaint submitted successfully! We will get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="complaint-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <div className="location-input-group">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Enter incident location"
                  />
                  <button 
                    type="button" 
                    className="location-button"
                    onClick={handleShareLocation}
                  >
                    Use Current Location
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="complaintType">Complaint Type</label>
                  <select
                    id="complaintType"
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">General Complaint</option>
                    <option value="harassment">Harassment</option>
                    <option value="stalking">Stalking</option>
                    <option value="threat">Threat</option>
                    <option value="assault">Assault</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority Level</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Complaint Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Please provide detailed information about the incident..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="attachments">Attach Files (Optional)</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    onChange={handleFileUpload}
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="file-input"
                  />
                  <label htmlFor="attachments" className="file-upload-label">
                    <span className="file-upload-icon">📎</span>
                    Choose Files
                  </label>
                </div>
                {formData.attachments.length > 0 && (
                  <div className="attachments-list">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="attachment-item">
                        <span className="attachment-icon">📄</span>
                        <span className="attachment-name">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className={`submit-button ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span className="button-icon">📝</span>
                    Submit Complaint
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'quick' && (
          <div className="quick-actions-grid">
            <button className="quick-action-card" onClick={handleShareLocation}>
              <span className="action-icon">📱</span>
              <h3>Share Location</h3>
              <p>Share your current location with emergency contacts</p>
            </button>
            <button className="quick-action-card">
              <span className="action-icon">🔔</span>
              <h3>Alert Nearby</h3>
              <p>Send emergency alerts to nearby users</p>
            </button>
            <button className="quick-action-card">
              <span className="action-icon">📞</span>
              <h3>Call Emergency</h3>
              <p>Quickly dial emergency services</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feature6;
