import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import useLogin from "../hooks/useLogin";  // Import the custom hook
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const {
    email,
    password,
    errorMessage,
    user,
    setEmail,
    setPassword,
    handleLogin,
  } = useLogin();  // Use the custom hook

  // Redirect to the PlacementPage after successful login
  useEffect(() => {
    if (user) {
      // Navigate to the placement page if user is successfully logged in
      navigate("/dashboard");
    }
  }, [user, navigate]);

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

        {/* Display user info after successful login */}
        {user && (
          <div>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
