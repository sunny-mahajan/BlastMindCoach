import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return true;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
