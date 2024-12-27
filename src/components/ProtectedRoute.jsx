import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // Check for token in localStorage
  return isAuthenticated ? children : <Navigate to="/login" />;
}