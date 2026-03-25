import React, { useState } from "react";

function StepDiet({ onNext }) {
  const [dietPref, setDietPref] = useState("balanced");
  const [foodChoices, setFoodChoices] = useState([]);

  const options = [
    "Fruits", "Vegetables", "Whole Grains", "Nuts", "Legumes",
    "Chicken", "Beef", "Fish", "Eggs", "Dairy", "Protein Shakes"
  ];

  const toggleChoice = (choice) => {
    setFoodChoices((prev) =>
      prev.includes(choice) ? prev.filter((c) => c !== choice) : [...prev, choice]
    );
  };

  const handleProceed = () => {
    onNext({ dietPref, foodChoices });
  };

  return (
    <div className="onboarding-step animate-fade-in">
      <h2>Step 3: Your Fuel</h2>
      <p>Select your preferences to optimize your meal plan.</p>

      <div className="input-field mt-5">
        <label>Diet Type</label>
        <select value={dietPref} onChange={(e) => setDietPref(e.target.value)}>
          <option value="balanced">Balanced</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="keto">Keto</option>
          <option value="paleo">Paleo</option>
        </select>
      </div>

      <div className="input-field mt-5">
        <label>Food Choices (Select all that apply)</label>
        <div className="food-grid mt-3">
          {options.map((choice) => (
            <div
              key={choice}
              className={`food-chip ${foodChoices.includes(choice) ? 'active' : ''}`}
              onClick={() => toggleChoice(choice)}
            >
              {choice}
            </div>
          ))}
        </div>
      </div>

      <button className="btn-primary-premium mt-5 w-100" onClick={handleProceed}>
        CONTINUE
      </button>
    </div>
  );
}

export default StepDiet;
