// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PlacementPage from "./components/PlacementPage";
import "./App.css";

function App() {
  return (
    
      <Router>
        <Routes>
          {/* Define the route for the login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Define the route for the placement page */}
          <Route path="/dashboard" element={<PlacementPage />} />

          {/* Redirect to login page if no route matches */}
          <Route path="/" element={<LoginPage />} />

          
        </Routes>
      </Router>
  );
}

export default App;
