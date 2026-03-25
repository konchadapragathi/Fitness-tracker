import React, { useState } from "react";

function StepActivity({ onNext }) {
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [fitnessLevel, setFitnessLevel] = useState("intermediate");
  const [weeklyGoal, setWeeklyGoal] = useState("3-5Hr");

  const handleProceed = () => {
    onNext({ activityLevel, fitnessLevel, weeklyGoal });
  };

  return (
    <>
      <h2>Step 2 of 4</h2>
      <label>Activity Level</label>
      <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
        <option value="sedentary">No Exercise (Sedentary)</option>
        <option value="moderate">Moderate Exercise</option>
        <option value="super">Super Active</option>
      </select>

      <label>Fitness Level</label>
      <select value={fitnessLevel} onChange={(e) => setFitnessLevel(e.target.value)}>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <label>Weekly Activity Goal</label>
      <select value={weeklyGoal} onChange={(e) => setWeeklyGoal(e.target.value)}>
        <option value="<1Hr">&lt;1Hr</option>
        <option value="1-3Hr">1-3Hr</option>
        <option value="3-5Hr">3-5Hr</option>
        <option value="5-7Hr">5-7Hr</option>
        <option value=">7Hr">&gt;7Hr</option>
      </select>

      <button onClick={handleProceed}>PROCEED</button>
    </>
  );
}

export default StepActivity;
