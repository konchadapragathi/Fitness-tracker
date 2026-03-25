import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStrengthExercises } from "../utils/api";
import "./Strength.css";

function Strength() {
  const [muscle, setMuscle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const muscleTags = [
    { label: 'Chest', q: 'chest' },
    { label: 'Back', q: 'middle_back' },
    { label: 'Legs', q: 'quadriceps' },
    { label: 'Biceps', q: 'biceps' },
    { label: 'Triceps', q: 'triceps' },
    { label: 'Shoulders', q: 'shoulders' }
  ];

  const handleSearchDirect = async (overrideMuscle) => {
    const query = overrideMuscle || muscle;
    if (!query) return;
    setLoading(true);
    try {
      setError("");
      const data = await fetchStrengthExercises(query);

      if (!data || data.length === 0) {
        setError(`No exercises found for "${query}".`);
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "strengthResults",
        JSON.stringify({ muscle: query, data })
      );

      navigate("/strength-output");
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleSearch = async () => handleSearchDirect(muscle);

  return (
    <div className="feature-page animate-fade-in">
      <div className="feature-container">
        <div className="feature-header">
          <button className="icon-btn mb-4" onClick={() => navigate("/goals")}>
            &#8592;
          </button>
          <h1>Strength <span className="lab-tag">LAB</span></h1>
          <p>Push your limits. Track your progress. Own your journey.</p>
        </div>

        <div className="glass-panel feature-card">
          <div className="input-section">
            <label className="input-label">TARGET MUSCLE GROUP</label>
            <input
              type="text"
              placeholder="e.g. chest, back, quadriceps"
              className="premium-input-field"
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />

            <div className="chip-grid">
              {muscleTags.map(m => (
                <div
                  key={m.label}
                  className={`feature-chip ${muscle === m.q ? 'active' : ''}`}
                  onClick={() => {
                    setMuscle(m.q);
                    handleSearchDirect(m.q);
                  }}
                >
                  {m.label}
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
              {loading ? "Discover Exercises..." : "Generate Routine"}
            </button>
          </div>

          {error && <div className="error-message mt-4">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Strength;
