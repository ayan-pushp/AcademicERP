import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the Authorization header if the token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
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

let alertTriggered = false;

// Export a function to configure the interceptor with navigation
export const setUpApiInterceptor = (navigate) => {
  api.interceptors.response.use(
    (response) => response,  // If the request is successful, return the response
    (error) => {
      
      if (error.response && error.response.status === 401 && !alertTriggered) {
        alertTriggered = true;
        alert("Session expired or unauthorized access. Please login again.");
        navigate("/login");
        // Reset the alertTriggered flag after redirecting, using a timeout
        setTimeout(() => {
          alertTriggered = false;
        }, 1000); // Wait a second before resetting the flag
      }
      return Promise.reject(error);
    }
  );
};

export default api;
