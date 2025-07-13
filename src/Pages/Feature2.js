import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk1mwY21RwPR4jd1_MdqOeqHtc56mjhhk",
  authDomain: "heatmap-6e1be.firebaseapp.com",
  projectId: "heatmap-6e1be",
  storageBucket: "heatmap-6e1be.firebasestorage.app",
  messagingSenderId: "227168829867",
  appId: "1:227168829867:web:2dc734cc1f8443937fd2ee",
  measurementId: "G-NYJRGTYM6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const CrimeHeatmap = () => {
  const [map, setMap] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [timeFilterHours, setTimeFilterHours] = useState(24);
  const [radius, setRadius] = useState(20);
  const [opacity, setOpacity] = useState(0.7);
  const [statusMessage, setStatusMessage] = useState('Loading crime data...');
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);
  const scriptRef = useRef(null);

  // Load Google Maps script
  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // Prevent multiple script loads
    if (scriptRef.current) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDGVg62dsidCJ9p5UsbjiNOu2pharMyGRE&libraries=visualization`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    script.onerror = () => {
      setStatusMessage('Error loading Google Maps');
    };
    
    scriptRef.current = script;
    document.head.appendChild(script);

    return () => {
      // Clean up on unmount
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  // Initialize map
  const initMap = () => {
    if (window.google && window.google.maps && mapRef.current) {
      try {
        const newMap = new window.google.maps.Map(mapRef.current, {
          zoom: 12,
          center: { lat: 28.5956, lng: 77.1673 },
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        });
        setMap(newMap);
        loadCrimeData(newMap);
      } catch (error) {
        console.error('Error initializing map:', error);
        setStatusMessage('Error initializing map');
      }
    }
  };

  // Load crime data from Firestore
  const loadCrimeData = async (mapInstance) => {
    if (!mapInstance) return;

    try {
      setIsLoading(true);
      setStatusMessage('Loading crime data...');
      setHeatmapData([]);

      const crimeCollection = collection(db, 'crime');
      let q = crimeCollection;

      // Time filtering logic (enable when timestamp field is available)
      if (timeFilterHours > 0) {
        const timeThreshold = new Date();
        timeThreshold.setHours(timeThreshold.getHours() - timeFilterHours);
        // Uncomment when timestamp is available in your Firestore documents
        // q = query(crimeCollection, where('timestamp', '>=', timeThreshold));
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setStatusMessage('No crime data found');
        createHeatmap(mapInstance, []);
        return;
      }

      const locations = [];
      
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        
        // Validate latitude and longitude
        if (data.latitude && data.longitude && 
            typeof data.latitude === 'number' && 
            typeof data.longitude === 'number' &&
            data.latitude >= -90 && data.latitude <= 90 &&
            data.longitude >= -180 && data.longitude <= 180) {
          
          if (data.severity && typeof data.severity === 'number') {
            // Weighted point with severity
            locations.push({
              location: new window.google.maps.LatLng(data.latitude, data.longitude),
              weight: Math.max(0.1, parseFloat(data.severity)) // Ensure positive weight
            });
          } else {
            // Simple point without weight
            locations.push(new window.google.maps.LatLng(data.latitude, data.longitude));
          }
        } else {
          console.warn('Invalid coordinates in document:', doc.id, data);
        }
      });

      setHeatmapData(locations);
      createHeatmap(mapInstance, locations);

      setStatusMessage(
        timeFilterHours > 0 
          ? `Showing ${locations.length} crimes from the last ${timeFilterHours} hours`
          : `Showing all ${locations.length} crime locations`
      );
    } catch (error) {
      console.error('Error getting crime data:', error);
      setStatusMessage(`Error loading crime data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Create heatmap layer
  const createHeatmap = (mapInstance, data) => {
    if (!mapInstance || !window.google?.maps?.visualization) {
      console.error('Google Maps visualization library not loaded');
      return;
    }

    try {
      // Remove existing heatmap
      if (heatmap) {
        heatmap.setMap(null);
      }

      if (data.length === 0) {
        setHeatmap(null);
        return;
      }

      const newHeatmap = new window.google.maps.visualization.HeatmapLayer({
        data: data,
        map: mapInstance,
        radius: radius,
        opacity: opacity,
      });
      
      setHeatmap(newHeatmap);
    } catch (error) {
      console.error('Error creating heatmap:', error);
      setStatusMessage('Error creating heatmap visualization');
    }
  };

  // Update heatmap properties when controls change
  useEffect(() => {
    if (heatmap) {
      heatmap.set('radius', radius);
      heatmap.set('opacity', opacity);
    }
  }, [radius, opacity, heatmap]);

  // Handle filter application
  const applyFilters = () => {
    if (map) {
      loadCrimeData(map);
    }
  };

  // Render method
  return (
    <div className="crime-heatmap-container" style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div 
        ref={mapRef} 
        style={{ 
          height: '100%', 
          width: '100%', 
          position: 'absolute' 
        }} 
      />
      
      <div 
        className="control-panel" 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,.3)',
          zIndex: 1,
          maxWidth: '300px'
        }}
      >
        <h2 style={{ marginTop: 0, color: '#3c4043' }}>EmpowerHer Crime Map</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Time Range:
          </label>
          <select 
            value={timeFilterHours} 
            onChange={(e) => setTimeFilterHours(parseInt(e.target.value))}
            style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
            disabled={isLoading}
          >
            <option value="6">Last 6 hours</option>
            <option value="12">Last 12 hours</option>
            <option value="24">Last 24 hours</option>
            <option value="48">Last 48 hours</option>
            <option value="168">Last week</option>
            <option value="720">Last month</option>
            <option value="0">All time</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Heatmap Radius: {radius}
          </label>
          <input 
            type="range" 
            min="10" 
            max="50" 
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            style={{ width: '100%' }}
            disabled={isLoading}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Opacity: {opacity.toFixed(1)}
          </label>
          <input 
            type="range" 
            min="0.1" 
            max="1" 
            step="0.1" 
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            style={{ width: '100%' }}
            disabled={isLoading}
          />
        </div>
        
        <button 
          onClick={applyFilters}
          disabled={isLoading || !map}
          style={{
            backgroundColor: isLoading || !map ? '#ccc' : '#4285f4',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: isLoading || !map ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            marginTop: '10px'
          }}
        >
          {isLoading ? 'Loading...' : 'Apply Filters'}
        </button>
        
        <button 
          onClick={() => loadCrimeData(map)}
          disabled={isLoading || !map}
          style={{
            backgroundColor: isLoading || !map ? '#ccc' : '#4285f4',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: isLoading || !map ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          Refresh Data
        </button>
        
        <div 
          style={{ 
            marginTop: '10px', 
            fontStyle: 'italic', 
            color: '#5f6368' 
          }}
        >
          {statusMessage}
        </div>
      </div>
    </div>
  );
};

export default CrimeHeatmap;
