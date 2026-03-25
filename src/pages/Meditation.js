import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Meditation.css";

function Meditation() {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState("Inhale"); // Inhale, Hold, Exhale
  const [isCompleted, setIsCompleted] = useState(false);

  // Breathing cycle logic (Seconds per phase: 4 inhale, 4 hold, 4 exhale)
  const updateBreathingRec = useCallback(() => {
    if (!isActive) return;
    const cycleTime = 12; // Total seconds for one full breath
    const stage = (duration * 60 - timeLeft) % cycleTime;

    if (stage < 4) setPhase("Inhale");
    else if (stage < 8) setPhase("Hold");
    else setPhase("Exhale");
  }, [isActive, timeLeft, duration]);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        updateBreathingRec();
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsCompleted(true);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, updateBreathingRec]);

  const startSession = () => {
    setTimeLeft(duration * 60);
    setIsActive(true);
    setIsCompleted(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isCompleted) {
    return (
      <div className="meditation-page animate-fade-in completed-bg">
        <div className="meditation-container glass-panel text-center">
          <div className="success-icon">✨</div>
          <h2 className="mt-3">Session Complete</h2>
          <p className="text-muted">You've successfully completed {duration} minutes of mindfulness.</p>
          <div className="stats-box mt-4">
            <div className="stat">
              <span className="stat-label">Total Time</span>
              <span className="stat-value">{duration} min</span>
            </div>
            <div className="stat">
              <span className="stat-label">Zen Earned</span>
              <span className="stat-value">+{duration * 10}</span>
            </div>
          </div>
          <button className="btn-primary-premium w-100 mt-5" onClick={() => navigate("/goals")}>
            Return to Dashboard
          </button>
          <button className="btn-secondary-premium w-100 mt-2" onClick={() => setIsCompleted(false)}>
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="meditation-page animate-fade-in session-bg">
        <div className="session-overlay"></div>
        <div className="meditation-container session-container">
          <div className="timer-display">{formatTime(timeLeft)}</div>

          <div className={`breathing-circle ${phase.toLowerCase()}`}>
            <div className="circle-content">
              <span className="phase-text">{phase}</span>
            </div>
          </div>

          <div className="session-controls">
            <button className="btn-secondary-premium" onClick={() => setIsActive(false)}>
              End Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="meditation-page animate-fade-in settings-bg">
      <div className="meditation-container glass-panel">
        <div className="meditation-header">
          <button className="icon-btn" onClick={() => navigate(-1)}>
            &#8592;
          </button>
          <div className="meditation-title">
            <h2>Mindfulness</h2>
          </div>
          <div style={{ width: '40px' }}></div>
        </div>

        <div className="meditation-content mt-4">
          <div className="slider-section">
            <div className="slider-header">
              <h3>Session Duration</h3>
              <span className="slider-value">{duration} min</span>
            </div>
            <input
              type="range"
              className="premium-range"
              min="1"
              max="20"
              step="1"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
            <div className="slider-labels">
              <span>1 min</span>
              <span>20 min</span>
            </div>
          </div>

          <div className="info-card mt-5">
            <div className="info-icon">💡</div>
            <p>Deep breathing reduces stress, lowers heart rate, and improves focus. Choose your time and find a quiet space.</p>
          </div>
        </div>

        <div className="meditation-footer mt-5">
          <button className="btn-primary-premium w-100" onClick={startSession}>
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default Meditation;
