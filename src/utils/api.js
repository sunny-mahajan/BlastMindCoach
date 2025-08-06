import axios from 'axios';

// Set your API base URL here
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Add a response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // You can customize error handling here
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // No response received
      console.error('API No Response:', error.request);
    } else {
      // Something else happened
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Helper to build endpoints
export const endpoint = (path) => `${path}`;

// Utility to cancel all pending requests
let cancelTokens = [];

export const getCancelToken = () => {
  const source = axios.CancelToken.source();
  cancelTokens.push(source);
  return source.token;
};

export const cancelAllRequests = (message = 'Operation canceled by the user.') => {
  cancelTokens.forEach(source => {
    if (source.cancel) source.cancel(message);
  });
  cancelTokens = [];
};

export default api;