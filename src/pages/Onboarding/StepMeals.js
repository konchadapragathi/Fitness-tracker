import React, { useState } from "react";

function StepMeals({ onNext }) {
  const [mealFrequency, setMealFrequency] = useState("3");

  const handleProceed = () => {
    onNext({ mealFrequency });
  };

  return (
    <>
      <h2>Step 4 of 4</h2>
      <label>Preferred Meal Frequency</label>
      <select value={mealFrequency} onChange={(e) => setMealFrequency(e.target.value)}>
        <option value="2">2 meals/day</option>
        <option value="3">3 meals/day</option>
        <option value="4">4 meals/day</option>
        <option value="5">5 meals/day</option>
      </select>

      <button onClick={handleProceed}>PROCEED</button>
    </>
  );
}

export default StepMeals;
