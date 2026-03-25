import React, { useState } from "react";

function StepVitals({ onNext }) {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);

  const handleProceed = () => {
    onNext({ sex, age: parseInt(age), weight: parseFloat(weight), height: parseFloat(height) });
  };

  return (
    <div className="onboarding-step animate-fade-in">
      <h2>Step 1: Your Biometrics</h2>
      <p>Essential data to calculate your personalized targets.</p>

      <div className="input-field mt-4">
        <label>Biological Sex</label>
        <select value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="input-row mt-4">
        <div className="input-field">
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      <div className="input-field mt-4">
        <label>Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      <button className="btn-primary-premium mt-5 w-100" onClick={handleProceed}>
        CONTINUE
      </button>
    </div>
  );
}

export default StepVitals;
