import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          Cookies.remove("token");
          window.location.href = "/";
          break;
        case 403:
          console.error("Access forbidden");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 422:
          console.error("Validation error:", data.message);
          break;
        case 429:
          console.error("Too many requests");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error(`Server error ${status}:`, data.message);
      }

      throw {
        status,
        message: data?.message || `Server error ${status}`,
        errors: data?.errors || null,
        ...error.response,
      };
    }

    throw error;
  }
);

export default api;
