import { useState } from "react";
import { login } from "../utils/api";  // Import the API function
import User from "../model/User";  // Import the User model

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);  // Track the user object

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });

      if (response.data.token) {
        const newUser = new User(email, response.data.name, response.data.token); // Create a new user instance
        setUser(newUser);  // Store the user in the state
        localStorage.setItem("username", newUser.name);
        localStorage.setItem("authToken", newUser.token);
        alert("Login successful");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data || "An error occurred.");
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
      console.error("Login failed:", error);
      alert("Login failed");
      return false;
    }
  };

  return {
    email,
    password,
    errorMessage,
    user,  // Expose the user object
    setEmail,
    setPassword,
    handleLogin,
  };
};

export default useLogin;
