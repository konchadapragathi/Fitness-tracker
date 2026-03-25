import React from "react";

function StepWelcome({ onNext }) {
  const handleStart = () => {
    onNext({ started: true });
  };

  return (
    <div className="welcome-step">
      <h1>🚀 Awesome!</h1>
      <p>
        Let’s craft your personalized diet and workout plan by answering simple
        questions!
      </p>
      <button onClick={handleStart}>LET'S START</button>
    </div>
  );
}

export default StepWelcome;
