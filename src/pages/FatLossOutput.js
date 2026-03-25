import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FatLossOutput.css";

function FatLossOutput() {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("fatLossResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  if (!results) {
    return (
      <div className="fatloss-output-page animate-fade-in">
        <div className="empty-state glass-panel">
          <div className="empty-icon">⚠️</div>
          <h2>No results found</h2>
          <p>Please go back to the Fat Loss page and try again.</p>
          <button className="btn-primary-premium mt-3" onClick={() => navigate("/fatloss")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fatloss-output-page animate-fade-in">
      <div className="page-container">
        <div className="page-header output-header">
          <button className="icon-btn mb-2" onClick={() => navigate("/fatloss")}>
            &#8592;
          </button>
          <h1>🔥 Calories Burned for <span className="highlight-secondary">{results.activity}</span></h1>
          <p>Tracking your burn helps you stay on top of your goals.</p>
        </div>

        <div className="fatloss-grid">
          {results.data.map((entry, i) => (
            <div key={i} className="fatloss-card glass-panel">
              <div className="card-header border-0 pb-0">
                <h3>{entry.name}</h3>
              </div>
              <div className="fatloss-stats">
                <div className="stat-box">
                  <span className="stat-label">Duration</span>
                  <span className="stat-value">{entry.duration_minutes} <small>min</small></span>
                </div>
                <div className="stat-box accent-box">
                  <span className="stat-label">Burned</span>
                  <span className="stat-value">{entry.total_calories} <small>kcal</small></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FatLossOutput;
