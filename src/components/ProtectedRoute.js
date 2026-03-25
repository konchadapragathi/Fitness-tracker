// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    // 🚫 Not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in → show the page
  return children;
}

export default ProtectedRoute;
