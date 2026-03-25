import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { workoutPlan } from "../utils/api";
import "./Workout.css";

function Workout() {
  const [muscle, setMuscle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearchDirect = (overrideMuscle) => {
    const query = overrideMuscle || muscle;
    setError("");
    if (!query) return;

    const exercises = workoutPlan[query.toLowerCase()];
    if (!exercises) {
      setError(`No workout plan found for "${query}". Try "chest", "back", "legs", etc.`);
      return;
    }

    // ✅ Store result and navigate
    localStorage.setItem("workoutPlanData", JSON.stringify({
      muscle: query,
      plan: exercises
    }));

    navigate("/workout-output");
  };

  const handleSearch = () => handleSearchDirect(muscle);

  return (
    <div className="workout-page animate-fade-in">
      <div className="page-container">
        <div className="workout-header text-center">
          <button className="icon-btn mb-3" onClick={() => navigate("/goals")}>
            &#8592;
          </button>
          <h1>✨ Build Your <span className="highlight-workout">Perfect Split</span></h1>
          <p>Professional workout routines tailored to your target muscle groups.</p>
        </div>

        <div className="workout-search-container glass-panel">
          <div className="search-section">
            <h3>Target a Muscle Group</h3>
            <div className="search-input-group mt-3">
              <input
                type="text"
                placeholder="e.g. chest, back, legs..."
                className="input-premium"
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch} className="btn-primary-premium">Get Plan</button>
            </div>
          </div>

          <div className="tags-section mt-5">
            <span className="tags-label">Popular Targets</span>
            <div className="popular-tags mt-3">
              {['chest', 'back', 'legs', 'biceps', 'triceps', 'shoulders'].map(m => (
                <button
                  key={m}
                  className="badge-tag"
                  onClick={() => {
                    setMuscle(m);
                    handleSearchDirect(m);
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="workout-error mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Workout;
