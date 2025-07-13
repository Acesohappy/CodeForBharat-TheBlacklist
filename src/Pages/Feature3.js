import React, { useState, useEffect, useRef } from "react";
import { LoadScript, GoogleMap, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";
import routeData from '../Pages/routeData.json';
import '../Pages/RouteMap.css';
import { Link } from "react-router-dom";
import BottomNav from "../Components/BottomNav";
import "../App.css";

const Feature3 = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  // Map configuration
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const center = {
    lat: 11.1271, 
    lng: 78.6569 // Center of Tamil Nadu
  };

  const cities = Object.keys(routeData.cities);

  const generateRoutes = () => {
    if (!startLocation || !endLocation) {
      alert("Please select both start and end locations");
      return;
    }

    // Generate routes
    const safetyRoutes = [
      {
        id: 1,
        name: "Safest Route",
        safetyScore: calculateSafetyScore(startLocation, endLocation),
        distance: getRouteDistance(startLocation, endLocation),
        time: "4 hrs 30 mins",
        risks: getRisks(startLocation, endLocation)
      },
      {
        id: 2,
        name: "Quickest Route",
        safetyScore: calculateSafetyScore(startLocation, endLocation) - 5,
        distance: getRouteDistance(startLocation, endLocation),
        time: "4 hrs 15 mins",
        risks: getRisks(startLocation, endLocation)
      },
      {
        id: 3,
        name: "Alternative Route",
        safetyScore: calculateSafetyScore(startLocation, endLocation) - 10,
        distance: getRouteDistance(startLocation, endLocation),
        time: "4 hrs 45 mins",
        risks: getRisks(startLocation, endLocation)
      }
    ];

    setRoutes(safetyRoutes);
    setSelectedRoute(safetyRoutes[0]);
  };

  const calculateSafetyScore = (start, end) => {
    const startCity = routeData.cities[start];
    const endCity = routeData.cities[end];
    
    const safetyMap = {
      'High': 70,
      'Medium': 85,
      'Low': 95
    };

    return Math.round((safetyMap[startCity.crimeRate] + safetyMap[endCity.crimeRate]) / 2);
  };

  const getRouteDistance = (start, end) => {
    const routeKey = `${start}-${end}`;
    return routeData.routes[routeKey]?.distance || "Calculating...";
  };

  const getRisks = (start, end) => {
    const routeKey = `${start}-${end}`;
    return routeData.routes[routeKey]?.segments[0]?.risks || 
           ["No specific route risks identified"];
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        console.log('Directions request failed:', response.status);
      }
    }
  };

  const getSafetyColor = (score) => {
    if (score >= 90) return 'safety-high';
    if (score >= 70) return 'safety-medium';
    return 'safety-low';
  };

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
        <h1 className="feature-title">Safe Routes</h1>
        <p className="feature-subtitle">
          Find and plan safe routes for your journey
        </p>

        <div className="route-planning-section">
          <div className="route-inputs">
            <div className="input-group">
              <label>From</label>
              <input 
                type="text" 
                placeholder="From" 
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                list="start-locations"
              />
              <datalist id="start-locations">
                {cities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
            <div className="input-group">
              <label>To</label>
              <input 
                type="text" 
                placeholder="To" 
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                list="end-locations"
              />
              <datalist id="end-locations">
                {cities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
            <button onClick={generateRoutes}>Find Safe Routes</button>
          </div>

          <div className="routes-list">
            {routes.map((route) => (
              <div
                key={route.id}
                className={`route-card ${
                  selectedRoute === route.id ? "selected" : ""
                }`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <div className="route-header">
                  <h3>{route.name}</h3>
                  <span className={`safety-badge ${getSafetyColor(route.safetyScore)}`}>
                    Safer 85%
                  </span>
                </div>
                <div className="route-details">
                  <div className="route-info">
                    <span>{route.distance}</span>
                    <span>{route.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />


      <LoadScript googleMapsApiKey="AIzaSyCswT-gc-zHWQktU-tMaw8F5WRnQYQiUFg">
        <div className="routes-map-container">
          <div className="map-container">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={7}
              onLoad={map => setMap(map)}
            >
              {startLocation && endLocation && (
                <>
                  <Marker 
                    position={routeData.cities[startLocation].coordinates} 
                    label={startLocation}
                  />
                  <Marker 
                    position={routeData.cities[endLocation].coordinates} 
                    label={endLocation}
                  />
                  <DirectionsService
                    options={{
                      destination: routeData.cities[endLocation].coordinates,
                      origin: routeData.cities[startLocation].coordinates,
                      travelMode: "DRIVING"
                    }}
                    callback={directionsCallback}
                  />
                </>
              )}

              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 4
                    }
                  }}
                />
              )}
            </GoogleMap>
          </div>
        </div>
      </LoadScript>
    </div>
  );
};

export default Feature3;