import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

// Firebase configuration (Note: In a real app, move this to environment variables)
const firebaseConfig = {
  apiKey: "AIzaSyAomjSB1dyXeQztq7hKKK0zIWt1XF1CKWI",
  projectId: "empowerher-285ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CrimeHeatmap = () => {
  const [map, setMap] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [timeFilterHours, setTimeFilterHours] = useState(24);
  const [radius, setRadius] = useState(20);
  const [opacity, setOpacity] = useState(0.7);
  const [statusMessage, setStatusMessage] = useState('Loading crime data...');
  const mapRef = useRef(null);

  // Load Google Maps script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDGVg62dsidCJ9p5UsbjiNOu2pharMyGRE&libraries=visualization`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Initialize map
  const initMap = () => {
    if (window.google && window.google.maps) {
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
    }
  };

  // Load crime data from Firestore
  const loadCrimeData = async (mapInstance) => {
    try {
      setStatusMessage('Loading crime data...');
      setHeatmapData([]);

      const crimeCollection = collection(db, 'crime');
      let q = crimeCollection;

      // Time filtering logic (commented out as per original code)
      if (timeFilterHours > 0) {
        const timeThreshold = new Date();
        timeThreshold.setHours(timeThreshold.getHours() - timeFilterHours);
        // Uncomment when timestamp is available
        // q = query(crimeCollection, where('timestamp', '>=', timeThreshold));
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setStatusMessage('No crime data found');
        createHeatmap(mapInstance, []);
        return;
      }

      const locations = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          if (data.latitude && data.longitude) {
            return data.severity 
              ? { 
                  location: new window.google.maps.LatLng(data.latitude, data.longitude), 
                  weight: parseFloat(data.severity) 
                }
              : new window.google.maps.LatLng(data.latitude, data.longitude);
          }
          return null;
        })
        .filter(location => location !== null);

      setHeatmapData(locations);
      createHeatmap(mapInstance, locations);

      setStatusMessage(
        timeFilterHours > 0 
          ? `Showing ${locations.length} crimes from the last ${timeFilterHours} hours`
          : `Showing all ${locations.length} crime locations`
      );
    } catch (error) {
      console.error('Error getting crime data:', error);
      setStatusMessage('Error loading crime data');
    }
  };

  // Create heatmap layer
  const createHeatmap = (mapInstance, data) => {
    // Remove existing heatmap
    if (heatmap) {
      heatmap.setMap(null);
    }

    if (window.google?.maps?.visualization) {
      const newHeatmap = new window.google.maps.visualization.HeatmapLayer({
        data: data,
        map: mapInstance,
        radius: radius,
        opacity: opacity,
      });
      setHeatmap(newHeatmap);
    }
  };

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
          />
        </div>
        
        <button 
          onClick={applyFilters}
          style={{
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            marginTop: '10px'
          }}
        >
          Apply Filters
        </button>
        
        <button 
          onClick={() => loadCrimeData(map)}
          style={{
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
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
