// src/components/Logout.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/"); // back to login
  };

  return (
    <button className="nav-item nav-logout" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
