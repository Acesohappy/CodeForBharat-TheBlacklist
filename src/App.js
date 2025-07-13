import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Feature1 from "./Pages/Feature1";
import Feature2 from "./Pages/Feature2";
import Feature3 from "./Pages/Feature3";
import Feature4 from "./Pages/Feature4";
import Feature5 from "./Pages/Feature5";
import Feature6 from "./Pages/Feature6";
import Helpline from "./Pages/Helpline";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feature1" element={<Feature1 />} />
        <Route path="/feature2" element={<Feature2 />} />
        <Route path="/feature3" element={<Feature3 />} />
        <Route path="/feature4" element={<Feature4 />} />
        <Route path="/feature5" element={<Feature5 />} />
        <Route path="/feature6" element={<Feature6 />} />
        <Route path="/helpline" element={<Helpline />} />
      </Routes>
    </Router>
  );
}

export default App;
