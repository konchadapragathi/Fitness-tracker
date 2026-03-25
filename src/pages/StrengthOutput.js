import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StrengthOutput.css";

const ExerciseCard = ({ ex }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250;

  const shouldTruncate = ex.instructions.length > maxLength;
  const displayedText = (isExpanded || !shouldTruncate)
    ? ex.instructions
    : `${ex.instructions.substring(0, maxLength)}...`;

  return (
    <div className="exercise-card glass-panel">
      <div className="card-header">
        <h3>{ex.name}</h3>
        <span className={`difficulty-badge difficulty-${ex.difficulty.toLowerCase()}`}>
          {ex.difficulty}
        </span>
      </div>
      <div className="card-body">
        <p className="type-label">{ex.type}</p>
        <div className="instructions">
          <strong>Instructions:</strong>
          <p>{displayedText}</p>
          {shouldTruncate && (
            <button
              className="read-more-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function StrengthOutput() {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("strengthResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  if (!results) {
    return (
      <div className="strength-output-page animate-fade-in">
        <div className="empty-state glass-panel">
          <div className="empty-icon">⚠️</div>
          <h2>No results found</h2>
          <p>Please go back to the Strength page and try again.</p>
          <button className="btn-primary-premium mt-3" onClick={() => navigate("/strength")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="strength-output-page animate-fade-in">
      <div className="page-container">
        <div className="output-header text-center">
          <button className="icon-btn mb-3" onClick={() => navigate("/strength")}>
            &#8592;
          </button>
          <h1>💪 Exercises for <span className="highlight">{results.muscle}</span></h1>
          <p>Master these movements to build serious strength.</p>
        </div>

        <div className="exercises-grid">
          {results.data.map((ex, i) => (
            <ExerciseCard key={i} ex={ex} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StrengthOutput;
