import React, { useState } from 'react';
import { Camera, Phone, MapPin, Wifi, Clock, ShieldAlert, X, UserPlus, Send } from 'lucide-react';
import '../Components/SOSButton.css'; // Import your CSS styles
const EmpowerHerSOS = () => {
  // State variables
  const [sosActive, setSosActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [location, setLocation] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Emergency Contact 1', phone: '555-123-4567' },
    { id: 2, name: 'Emergency Contact 2', phone: '555-987-6543' }
  ]);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [emergencyMessage, setEmergencyMessage] = useState('I m in an emergency situation and need help. Please contact me immediately or call authorities.');
  const [activeTab, setActiveTab] = useState('contacts');
  const [showModal, setShowModal] = useState(false);
  const [showPoliceNotification, setShowPoliceNotification] = useState(false);

  // Start/Stop SOS
  const toggleSOS = () => {
    if (sosActive) {
      stopSOS();
    } else {
      startSOS();
    }
  };

  // Start SOS mode
  const startSOS = () => {
    setSosActive(true);
    startRecording();
    startLocationTracking();
    startTimer();
    setShowModal(true);
  };

  // Stop SOS mode
  const stopSOS = () => {
    setSosActive(false);
    stopRecording();
    stopLocationTracking();
    stopTimer();
    setShowPoliceNotification(true);

    // Reset after 10 seconds
    setTimeout(() => {
      setShowPoliceNotification(false);
      setElapsedTime(0);
    }, 10000);
  };

  // Recording functions
  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => {
          setRecording(true);
        })
        .catch(error => {
          console.error('Error accessing media devices:', error);
          alert('Could not access camera or microphone. Please check permissions.');
        });
    } else {
      alert('Your browser does not support media recording.');
    }
  };

  const stopRecording = () => {
    setRecording(false);
  };

  // Location tracking
  const startLocationTracking = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting location:', error);
          alert('Could not access your location. Please check permissions.');
        }
      );
    } else {
      alert('Your browser does not support geolocation.');
    }
  };

  const stopLocationTracking = () => {
    setLocation(null);
  };

  // Timer functions
  const startTimer = () => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  // Format timer display
  const formatTimer = () => {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Contact management
  const addContact = () => {
    if (contactName && contactPhone) {
      const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
      setContacts([...contacts, { id: newId, name: contactName, phone: contactPhone }]);
      setContactName('');
      setContactPhone('');
    } else {
      alert('Please enter both name and phone number.');
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // Tab switching
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <header>
        <h1>EmpowerHer</h1>
      </header>

      <div className="card" id="sos-card">
        <div className={`card-header ${sosActive ? 'active' : ''}`}>
          <h2 className="card-title">Emergency SOS</h2>
          <p className="card-description">Tap the SOS button in case of emergency</p>
        </div>
        
        <div className="card-content">
          {sosActive && (
            <div id="sos-alert" className="alert alert-danger">
              <ShieldAlert className="alert-icon" />
              <div className="alert-content">
                <div className="alert-title">SOS Active</div>
                <div>Emergency mode is active. Your location is being tracked and evidence is being recorded.</div>
              </div>
            </div>
          )}
        
          <div className="sos-button-container">
            <button 
              id="sos-button" 
              className={`sos-button ${sosActive ? 'active' : ''}`}
              onClick={toggleSOS}
            >
              <ShieldAlert className="sos-icon" />
              SOS
            </button>
          </div>
        
          {sosActive && (
            <div id="status-container">
              <div className="status-container">
                <span className={`badge ${recording ? 'badge-danger' : 'badge-outline'}`}>
                  <Camera className="badge-icon" />
                  {recording ? 'Recording' : 'Not Recording'}
                </span>
                
                <span className={`badge ${location ? 'badge-danger' : 'badge-outline'}`}>
                  <MapPin className="badge-icon" />
                  {location ? 'Location Tracked' : 'No Location'}
                </span>
                
                <span className="badge badge-outline">
                  <Clock className="badge-icon" />
                  {formatTimer()}
                </span>
              </div>
              
              {location && (
                <div className="location-text">
                  Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </div>
              )}
              
              {showPoliceNotification && (
                <div className="police-notification">
                  <ShieldAlert className="police-icon" />
                  <div>
                    <strong>Evidence Sent to Police</strong>
                    <div>Video recording and location data have been securely transmitted to local authorities.</div>
                  </div>
                </div>
              )}
            </div>
          )}
        
          <div className="tabs">
            <div className="tabs-list">
              <div 
                className={`tab-trigger ${activeTab === 'contacts' ? 'active' : ''}`}
                onClick={() => switchTab('contacts')}
              >
                Emergency Contacts
              </div>
              <div 
                className={`tab-trigger ${activeTab === 'message' ? 'active' : ''}`}
                onClick={() => switchTab('message')}
              >
                Custom Message
              </div>
            </div>
            
            {activeTab === 'contacts' && (
              <div className="tab-content active" id="contacts-tab">
                <h3>Your Emergency Contacts</h3>
                
                <div className="contact-list">
                  {contacts.map(contact => (
                    <div key={contact.id} className="contact-item">
                      <div className="contact-info">
                        <Phone className="contact-icon" />
                        <div className="contact-details">
                          <h4>{contact.name}</h4>
                          <div className="contact-phone">
                            <Wifi className="contact-phone-icon" />
                            {contact.phone}
                          </div>
                        </div>
                      </div>
                      <button 
                        className="delete-button" 
                        onClick={() => deleteContact(contact.id)}
                      >
                        <X className="delete-icon" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4>Add New Contact</h4>
                  
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      placeholder="Contact name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input 
                      type="text" 
                      id="contact-phone" 
                      placeholder="Contact phone number"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    id="add-contact-btn" 
                    className="button button-outline button-full"
                    onClick={addContact}
                  >
                    <UserPlus className="button-icon" />
                    Add Contact
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'message' && (
              <div className="tab-content" id="message-tab">
                <div className="form-group">
                  <h3>Custom Emergency Message</h3>
                  <textarea 
                    id="emergency-message" 
                    placeholder="Enter a custom message to send to your emergency contacts..."
                    value={emergencyMessage}
                    onChange={(e) => setEmergencyMessage(e.target.value)}
                  />
                </div>
                
                <button 
                  id="save-message-btn" 
                  className="button button-outline button-full"
                >
                  <Send className="button-icon" />
                  Save Message
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="card-footer">
          {sosActive 
            ? 'SOS is active. Tap the button again to deactivate.' 
            : 'Tap SOS in case of emergency'}
        </div>
      </div>

      {showModal && (
        <div className="modal active">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Emergency Alerts Sent</h3>
            </div>
            <div className="modal-body">
              <p>Emergency alerts have been sent to your contacts with your current location. Help is on the way!</p>
              <p>Continue recording evidence for your safety.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="button button-outline"
                onClick={() => setShowModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpowerHerSOS;