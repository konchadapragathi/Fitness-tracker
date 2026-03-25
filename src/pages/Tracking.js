import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tracking.css";

function Tracking() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      setError("Please enter valid numbers for weight, height, and age.");
      return;
    }

    // Calculate BMR 
    const bmr =
      sex === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const multipliers = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extremelyActive: 1.9,
    };

    const multiplier = multipliers[activityLevel];
    if (!multiplier) {
      setError("Invalid activity level selected.");
      return;
    }

    const maintenanceCalories = bmr * multiplier;
    const weightLossCalories = maintenanceCalories - 500;
    const weightGainCalories = maintenanceCalories + 500;

    const resultData = {
      maintenance: maintenanceCalories.toFixed(0),
      loss: weightLossCalories.toFixed(0),
      gain: weightGainCalories.toFixed(0),
    };

    localStorage.setItem(
      "calorieTrackingData",
      JSON.stringify({
        weight: w,
        height: h,
        age: a,
        sex,
        activityLevel,
        ...resultData,
      })
    );

    // ✅ Navigate to the separate Output page
    navigate("/output");
  };

  return (
    <div className="tracking-page animate-fade-in">
      <div className="tracking-container glass-panel">
        <div className="tracking-header">
          <h1>Calorie Tracker</h1>
          <p>Calculate your daily energy needs</p>
        </div>

        <form className="tracking-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="e.g. 70"
              required
              className="input-premium"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              placeholder="e.g. 175"
              required
              className="input-premium"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="e.g. 25"
              required
              className="input-premium"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Biological Sex</label>
            <select className="input-premium" value={sex} onChange={(e) => setSex(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="input-group">
            <label>Activity Level</label>
            <select className="input-premium" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
              <option value="sedentary">Sedentary (Little or no exercise)</option>
              <option value="lightlyActive">Lightly Active (1-3 days/week)</option>
              <option value="moderatelyActive">Moderately Active (3-5 days/week)</option>
              <option value="veryActive">Very Active (6-7 days/week)</option>
              <option value="extremelyActive">Extremely Active (Physical job/training)</option>
            </select>
          </div>

          <button type="submit" className="btn-primary-premium tracking-btn">Calculate Calories</button>
        </form>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default Tracking;
