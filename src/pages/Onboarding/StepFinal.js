import React from "react";
import { useNavigate } from "react-router-dom";

function StepFinal({ data }) {
  const navigate = useNavigate();

  const handleProceed = () => {
    // ✅ Save all collected data
    localStorage.setItem("onboardingResults", JSON.stringify(data));

    // ✅ Redirect to output page
    navigate("/onboarding-output");
  };

  return (
    <>
      <h2>🎉 Congratulations!</h2>
      <p>Your Diet Plan and Exercise Plan is ready.</p>
      <button onClick={handleProceed}>VIEW PLAN</button>
    </>
  );
}

export default StepFinal;
