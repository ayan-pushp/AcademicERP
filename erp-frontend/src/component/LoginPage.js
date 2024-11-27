import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../util/api";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("authToken", response.data.token);
        alert("Login successful");
        navigate("/dashboard"); 
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data || "An error occurred.");
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Employee Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
          <button type="submit" className="login-button">Login</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
