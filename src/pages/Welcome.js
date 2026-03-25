import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page animate-fade-in">
      <div className="welcome-container glass-panel">
        <div className="welcome-content">
          <div className="logo-glow">
            <div className="logo-icon">
              <span role="img" aria-label="Gym">⚡</span>
            </div>
          </div>

          <h1 className="welcome-title">FITNESS PRO</h1>
          <p className="welcome-subtitle">Your journey starts here.</p>
        </div>

        <div className="welcome-actions">
          <button className="btn-primary-premium" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="btn-secondary-premium" onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
