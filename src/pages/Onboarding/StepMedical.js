import React, { useState } from "react";

function StepMedical({ onNext }) {
  const [conditions, setConditions] = useState([]);
  const [allergies, setAllergies] = useState([]);

  const conditionOptions = [
    "Diabetes", "Hypertension", "PCOD", "Thyroid", "Asthma",
    "Heart Disease", "Joint Pain", "Low BP", "Cholesterol"
  ];

  const allergyOptions = [
    "Peanuts", "Milk", "Eggs", "Wheat", "Fish", "Soy",
    "Shellfish", "Gluten", "Lactose", "Pollen"
  ];

  const toggleCondition = (choice) => {
    setConditions((prev) =>
      prev.includes(choice) ? prev.filter((c) => c !== choice) : [...prev, choice]
    );
  };

  const toggleAllergy = (choice) => {
    setAllergies((prev) =>
      prev.includes(choice) ? prev.filter((c) => c !== choice) : [...prev, choice]
    );
  };

  const handleProceed = () => {
    onNext({ conditions, allergies });
  };

  return (
    <div className="onboarding-step animate-fade-in">
      <h2>Step 4: Health Check</h2>
      <p>Please share any conditions or allergies to keep your plan safe.</p>

      <div className="input-field mt-5">
        <label>Medical Conditions</label>
        <div className="food-grid mt-3">
          {conditionOptions.map((choice) => (
            <div
              key={choice}
              className={`food-chip ${conditions.includes(choice) ? 'active' : ''}`}
              onClick={() => toggleCondition(choice)}
            >
              {choice}
            </div>
          ))}
        </div>
      </div>

      <div className="input-field mt-5">
        <label>Allergies & Intolerances</label>
        <div className="food-grid mt-3">
          {allergyOptions.map((choice) => (
            <div
              key={choice}
              className={`food-chip ${allergies.includes(choice) ? 'active' : ''}`}
              onClick={() => toggleAllergy(choice)}
            >
              {choice}
            </div>
          ))}
        </div>
      </div>

      <button className="btn-primary-premium mt-5 w-100" onClick={handleProceed}>
        LAST STEP
      </button>
    </div>
  );
}

export default StepMedical;
