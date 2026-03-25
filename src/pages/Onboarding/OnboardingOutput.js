import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingOutput.css";

function OnboardingOutput() {
  const [results, setResults] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("onboardingResults");
    if (stored) {
      const data = JSON.parse(stored);
      setResults(data);
      generateBlueprint(data);
    }
  }, []);

  const generateBlueprint = (data) => {
    const { sex, age, weight, height, activityLevel, fitnessLevel, dietPref } = data;

    // 1. Calculate TDEE (Mifflin-St Jeor)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = sex === "male" ? bmr + 5 : bmr - 161;

    const activityMultipliers = {
      sedentary: 1.2,
      moderate: 1.55,
      super: 1.9
    };
    const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));

    // 2. Macros (Balanced Default)
    let protein = Math.round(weight * 2.2); // 1g per lb
    let fats = Math.round((tdee * 0.25) / 9);
    let carbs = Math.round((tdee - (protein * 4) - (fats * 9)) / 4);

    if (dietPref === "keto") {
      fats = Math.round((tdee * 0.7) / 9);
      carbs = Math.round((tdee * 0.05) / 4);
      protein = Math.round((tdee - (fats * 9) - (carbs * 4)) / 4);
    }

    // 3. Workout Split
    let workout = "Full Body Awareness";
    let frequency = "3 Days / Week";
    let focus = "Functional Strength & Mobility";

    if (fitnessLevel === "intermediate") {
      workout = "Upper / Lower Split";
      frequency = "4 Days / Week";
      focus = "Hypertrophy & Strength";
    } else if (fitnessLevel === "advanced") {
      workout = "PPL (Push, Pull, Legs)";
      frequency = "6 Days / Week";
      focus = "Maximum Muscle Recruitment";
    }

    setBlueprint({
      calories: tdee,
      macros: { protein, carbs, fats },
      workout: { name: workout, freq: frequency, focus: focus },
      dietTips: getDietTips(dietPref),
      mealPlan: getMealPlan(dietPref)
    });
  };

  const getMealPlan = (pref) => {
    const plans = {
      vegetarian: [
        { meal: "Breakfast", title: "Greek Yogurt Power Bowl", desc: "1 Cup Greek Yogurt, 1/2 Cup Blueberries, 20g Almonds" },
        { meal: "Lunch", title: "Mediterranean Halloumi Wrap", desc: "Whole grain wrap, Grilled Halloumi, Spinach, Hummus, Peppers" },
        { meal: "Dinner", title: "Golden Tofu Stir-Fry", desc: "Crispy Tofu, Broccoli, Snap Peas, Brown Rice, Coconut Aminos" }
      ],
      vegan: [
        { meal: "Breakfast", title: "Savory Scrambled Tofu", desc: "Silken Tofu, Turmeric, Spinach, Onions, Whole Grain Toast" },
        { meal: "Lunch", title: "Rainbow Quinoa Salad", desc: "Quinoa, Black Beans, Corn, Avocado, Lime Cilantro Dressing" },
        { meal: "Dinner", title: "Lentil Shepherd's Pie", desc: "Red Lentils, Carrots, Mushroom Gravy, Sweet Potato Mash" }
      ],
      keto: [
        { meal: "Breakfast", title: "Keto Cloud Eggs & Bacon", desc: "2 Poached Eggs, 3 Strips Bacon, 1/2 Avocado, Sautéed Spinach" },
        { meal: "Lunch", title: "Chicken Pesto Zoodles", desc: "Zucchini Noodles, Grilled Chicken Breast, Pine Nut Pesto, Parmesan" },
        { meal: "Dinner", title: "Garlic Butter Ribeye", desc: "Ribeye Steak, Asparagus Spears, Herb Butter, Cauliflower Rice" }
      ],
      balanced: [
        { meal: "Breakfast", title: "Classic Oatmeal & Whey", desc: "1/2 Cup Oats, 1 Scoop Whey Protein, 1 Tbsp Peanut Butter, Banana" },
        { meal: "Lunch", title: "Lean Chicken & Sweet Potato", desc: "6oz Grilled Chicken, 150g Sweet Potato, Steamed Broccoli" },
        { meal: "Dinner", title: "Atlantic Salmon & Quinoa", desc: "6oz Salmon Fillet, 1/2 Cup Quinoa, Lemon Roasted Asparagus" }
      ]
    };
    return plans[pref] || plans.balanced;
  };

  const getDietTips = (pref) => {
    const tips = {
      vegetarian: ["Focus on lentils and chickpeas for protein", "Add Greek yogurt for B12", "Include varied nuts/seeds"],
      vegan: ["Supplement B12 and Vitamin D", "Prioritize soy and pea protein", "Use nutritional yeast for flavor"],
      keto: ["Focus on healthy fats (Avocado, Olive Oil)", "Keep net carbs under 20g", "Ensure adequate electrolytes"],
      "gluten-free": ["Use quinoa and brown rice", "Focus on naturally GF whole foods", "Check sauces for hidden gluten"],
      balanced: ["Prioritize whole grains", "Aim for 3-4 varied meals", "Stay hydrated (3L+ daily)"]
    };
    return tips[pref] || tips.balanced;
  };

  if (!results || !blueprint) {
    return (
      <div className="onboarding-output-page animate-fade-in">
        <div className="empty-state glass-panel">
          <div className="empty-icon">📋</div>
          <h2>No profile found</h2>
          <p>Please complete the onboarding to generate your blueprint.</p>
          <button className="btn-primary-premium mt-3" onClick={() => navigate("/onboarding")}>
            Get My Blueprint
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-output-page animate-fade-in">
      <div className="page-container">
        <div className="output-header text-center">
          <button className="icon-btn mb-3" onClick={() => navigate("/goals")}>
            &#8592;
          </button>
          <h1>✨ Your <span className="highlight-onboarding">Personal Blueprint</span></h1>
          <p>Engineered for your body type, goals, and lifestyle.</p>
        </div>

        <div className="blueprint-grid">
          {/* Nutrition Card */}
          <div className="blueprint-card glass-panel accent-emerald">
            <div className="card-badge">CALORIE BLUEPRINT</div>
            <div className="calorie-hero">
              <span className="cal-value">{blueprint.calories}</span>
              <span className="cal-label">DAILY CALORIES</span>
            </div>
            <div className="macro-stats mt-4">
              <div className="macro-box">
                <span className="m-val">{blueprint.macros.protein}g</span>
                <span className="m-lbl">Protein</span>
              </div>
              <div className="macro-box">
                <span className="m-val">{blueprint.macros.carbs}g</span>
                <span className="m-lbl">Carbs</span>
              </div>
              <div className="macro-box">
                <span className="m-val">{blueprint.macros.fats}g</span>
                <span className="m-lbl">Fats</span>
              </div>
            </div>
          </div>

          {/* Workout Card */}
          <div className="blueprint-card glass-panel accent-purple">
            <div className="card-badge">WORKOUT PLAN</div>
            <div className="workout-hero">
              <h2 className="workout-name">{blueprint.workout.name}</h2>
              <div className="workout-meta">
                <span className="meta-tag">{blueprint.workout.freq}</span>
              </div>
            </div>
            <div className="workout-focus mt-4">
              <span className="focus-label">PRIMARY FOCUS</span>
              <p className="focus-text">{blueprint.workout.focus}</p>
            </div>
          </div>

          {/* Meal Plan Card (New) */}
          <div className="blueprint-card glass-panel col-span-2 accent-orange">
            <div className="card-badge">DAILY MEAL GUIDE</div>
            <div className="meal-plan-container mt-4">
              {blueprint.mealPlan.map((meal, i) => (
                <div key={i} className="meal-item glass-panel">
                  <div className="meal-tag">{meal.meal}</div>
                  <div className="meal-content">
                    <h4>{meal.title}</h4>
                    <p>{meal.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Strategy Card */}
          <div className="blueprint-card glass-panel">
            <div className="card-badge">DIETARY STRATEGY</div>
            <div className="diet-tips mt-4">
              {blueprint.dietTips.map((tip, i) => (
                <div key={i} className="tip-item">⚡ {tip}</div>
              ))}
            </div>
          </div>

          {/* Biometrics Card */}
          <div className="blueprint-card glass-panel">
            <div className="card-badge">BIOMETRICS</div>
            <div className="vitals-row">
              <div className="vital-item">
                <span className="v-lbl">Age</span>
                <span className="v-val">{results.age}y</span>
              </div>
              <div className="vital-item">
                <span className="v-lbl">Weight</span>
                <span className="v-val">{results.weight}kg</span>
              </div>
              <div className="vital-item">
                <span className="v-lbl">Height</span>
                <span className="v-val">{results.height}cm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <button className="btn-primary-premium px-5" onClick={() => navigate("/goals")}>
            Save & Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingOutput;
