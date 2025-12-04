import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://kepribadianku-be.vercel.app/api";

const api = axios.create({
  baseURL,
  timeout: 15000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add loading indicator or auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server might be down');
    } else if (error.response) {
      // Server responded with error status
      console.error('Server error:', error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - please check your connection');
    } else {
      // Something else happened
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
