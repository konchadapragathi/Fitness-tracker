import React, { useState } from "react";
import StepWelcome from "./StepWelcome";
import StepVitals from "./StepVitals";
import StepActivity from "./StepActivity";
import StepDiet from "./StepDiet";
import StepMeals from "./StepMeals";
import StepMedical from "./StepMedical";
import StepConfirm from "./StepConfirm";
import StepFinal from "./StepFinal";
import "./Onboarding.css";

function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const next = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const steps = [
    <StepWelcome onNext={next} />,
    <StepVitals onNext={next} />,
    <StepActivity onNext={next} />,
    <StepDiet onNext={next} />,
    <StepMeals onNext={next} />,
    <StepMedical onNext={next} />,
    <StepConfirm onNext={next} data={formData} />,
    <StepFinal data={formData} />,
  ];

  return (
    <div className="onboarding-page animate-fade-in">
      <div className="onboarding-container">{steps[step]}</div>
    </div>
  );
}

export default OnboardingFlow;
