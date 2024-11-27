// src/utils/api.js
import axios from "axios";

// Set base URL and authorization headers
const api = axios.create({
  baseURL: "http://localhost:8080/api", // Replace with actual backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization Header:", config.headers.Authorization);

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
