import React from "react";
import { Navigate } from "react-router-dom";

// Replace this with your real auth logic
const isAuthenticated = () => {
  // Example: check localStorage or context
  return true;
};

const ProtectedRoute = ({ children }) => {
  console.log("ProtectedRoute", children);
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
