import React from "react";
import "./Goals.css";
import { useNavigate } from "react-router-dom";

function Goals() {
  const navigate = useNavigate();

  return (
    <div className="goals-page animate-fade-in">
      <div className="page-container goals-container">
        <div className="goals-header">
          <button className="icon-btn" onClick={() => navigate(-1)}>
            &#8592;
          </button>
        </div>

        <div className="goals-title-section">
          <h1>What brings you to FitHealth?</h1>
          <p>Select your primary goal to personalize your experience.</p>
        </div>

        <div className="goals-grid">
          <div className="goal-card glass-panel" onClick={() => navigate("/fatloss")}>
            <div className="goal-icon">⚖️</div>
            <span className="goal-name">Lose Weight</span>
          </div>
          <div className="goal-card glass-panel" onClick={() => navigate("/strength")}>
            <div className="goal-icon">💪</div>
            <span className="goal-name">Gain Strength</span>
          </div>
          <div className="goal-card glass-panel" onClick={() => navigate("/tracking")}>
            <div className="goal-icon">🎯</div>
            <span className="goal-name">Track BMI</span>
          </div>
          <div className="goal-card glass-panel" onClick={() => navigate("/meditation")}>
            <div className="goal-icon">🧘‍♀️</div>
            <span className="goal-name">Meditation</span>
          </div>
          <div className="goal-card glass-panel" onClick={() => navigate("/bio-optimizer")}>
            <div className="goal-icon">🧬</div>
            <span className="goal-name">Bio-Optimizer</span>
          </div>
          <div className="goal-card glass-panel" onClick={() => navigate("/workout")}>
            <div className="goal-icon">🏋️</div>
            <span className="goal-name">Workout Split</span>
          </div>
        </div>

        <div className="goals-actions">
          <button className="btn-secondary-premium w-100" onClick={() => navigate("/onboarding")}>
            Get Personalized Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Goals;
