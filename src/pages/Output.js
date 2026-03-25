import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Output.css";

function Output() {
  const [calorieData, setCalorieData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get data from localStorage
    const storedData = localStorage.getItem("calorieTrackingData");
    if (storedData) {
      setCalorieData(JSON.parse(storedData));
    }
  }, []);

  if (!calorieData) {
    return (
      <div className="output-page animate-fade-in">
        <div className="empty-state glass-panel">
          <div className="empty-icon">⚠️</div>
          <h2>No calorie data found</h2>
          <p>Please go back to the Tracker and calculate your daily needs.</p>
          <button className="btn-primary-premium mt-3" onClick={() => navigate("/tracking")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="output-page animate-fade-in">
      <div className="page-container">
        <div className="output-header text-center">
          <button className="icon-btn mb-3" onClick={() => navigate("/tracking")}>
            &#8592;
          </button>
          <h1>📊 Your <span className="highlight-tracking">Daily Results</span></h1>
          <p>Personalized energy metrics based on your body and activity.</p>
        </div>

        <div className="stats-summary glass-panel mb-4">
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Weight</span>
              <span className="value">{calorieData.weight} <small>kg</small></span>
            </div>
            <div className="summary-item">
              <span className="label">Height</span>
              <span className="value">{calorieData.height} <small>cm</small></span>
            </div>
            <div className="summary-item">
              <span className="label">Age</span>
              <span className="value">{calorieData.age}</span>
            </div>
            <div className="summary-item">
              <span className="label">Sex</span>
              <span className="value">{calorieData.sex}</span>
            </div>
          </div>
          <div className="activity-badge mt-3">
            <strong>Activity:</strong> {
              {
                sedentary: "Sedentary",
                lightlyActive: "Lightly Active",
                moderatelyActive: "Moderately Active",
                veryActive: "Very Active",
                extremelyActive: "Extremely Active"
              }[calorieData.activityLevel] || calorieData.activityLevel
            }
          </div>
        </div>

        <div className="tracking-results-grid">
          <div className="result-card glass-panel">
            <span className="result-label">Maintenance</span>
            <div className="result-value-large">{calorieData.maintenance} <small>kcal/day</small></div>
            <p className="result-desc">Calories to stay at your current weight.</p>
          </div>

          <div className="result-card glass-panel accent-primary-card">
            <span className="result-label">Weight Loss</span>
            <div className="result-value-large text-accent-primary">{calorieData.loss} <small>kcal/day</small></div>
            <p className="result-desc">Target for steady, healthy fat loss.</p>
          </div>

          <div className="result-card glass-panel accent-secondary-card">
            <span className="result-label">Weight Gain</span>
            <div className="result-value-large text-accent-secondary">{calorieData.gain} <small>kcal/day</small></div>
            <p className="result-desc">Target for lean muscle mass increase.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Output;
