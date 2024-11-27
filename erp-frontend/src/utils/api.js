import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",  // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the Authorization header if the token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");  // Retrieve the token from localStorage
    if (token) {
      // If the token exists, attach it to the request header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login API call
export const login = async (credentials) => {
  return api.post("/auth/login", credentials);
};

export default api;
