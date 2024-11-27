//src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import PlacementPage from "./component/PlacementPage";


function App() {
  
  return (
    
    <Router>
      <Routes>
        {/* Ensure the root route ("/") has a valid component */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PlacementPage />} />

      </Routes>
    </Router>
  );
  
}

export default App;
