import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCaloriesBurned } from "../utils/api";
import "./FatLoss.css";

function FatLoss() {
  const [activity, setActivity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fatLossTags = [
    { label: 'Running', q: 'running' },
    { label: 'Cycling', q: 'cycling' },
    { label: 'Swimming', q: 'swimming' },
    { label: 'Walking', q: 'walking' },
    { label: 'Circuit Training', q: 'circuit training' },
    { label: 'Hiking', q: 'hiking' }
  ];

  const handleSearchDirect = async (overrideActivity) => {
    const query = overrideActivity || activity;
    if (!query) return;
    setLoading(true);
    try {
      setError("");
      const data = await fetchCaloriesBurned(query);

      if (!data || data.length === 0) {
        setError(`No calorie data found for "${query}".`);
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "fatLossResults",
        JSON.stringify({ activity: query, data })
      );

      navigate("/fatloss-output");
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleSearch = async () => handleSearchDirect(activity);

  return (
    <div className="feature-page animate-fade-in">
      <div className="feature-container">
        <div className="page-header feature-header">
          <button className="icon-btn mb-2" onClick={() => navigate("/goals")}>
            &#8592;
          </button>
          <h1>Fat Loss <span className="lab-tag">LAB</span></h1>
          <p>You’re not just changing your body—you’re rewriting your story.</p>
        </div>

        <div className="glass-panel feature-card">
          <div className="input-section">
            <label className="input-label">ACTIVITY SEARCH</label>
            <input
              type="text"
              placeholder="Enter activity (e.g. running, cycling)"
              className="premium-input-field"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />

            <div className="chip-grid mt-4">
              {fatLossTags.map(t => (
                <div
                  key={t.label}
                  className={`feature-chip ${activity === t.q ? 'active' : ''}`}
                  onClick={() => {
                    setActivity(t.q);
                    handleSearchDirect(t.q);
                  }}
                >
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          <div className="action-section">
            <button
              onClick={handleSearch}
              className="btn-primary-premium w-100"
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate Calories"}
            </button>
          </div>

          {error && <div className="error-message mt-4">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default FatLoss;
