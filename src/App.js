// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Strength from "./pages/Strength";
import StrengthOutput from "./pages/StrengthOutput";
import FatLoss from "./pages/FatLoss";
import FatLossOutput from "./pages/FatLossOutput";
import Tracking from "./pages/Tracking";
import Output from "./pages/Output";
import Workout from "./pages/Workout";
import WorkoutOutput from "./pages/WorkoutOutput";
import Meditation from "./pages/Meditation";
import BioOptimizer from "./pages/BioOptimizer";
import Goals from "./pages/Goals";
import OnboardingFlow from "./pages/Onboarding/OnboardingFlow";
import OnboardingOutput from "./pages/Onboarding/OnboardingOutput";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes wrapped in MainLayout */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/strength" element={<Strength />} />
                  <Route path="/strength-output" element={<StrengthOutput />} />
                  <Route path="/fatloss" element={<FatLoss />} />
                  <Route path="/fatloss-output" element={<FatLossOutput />} />
                  <Route path="/tracking" element={<Tracking />} />
                  <Route path="/onboarding" element={<OnboardingFlow />} />
                  <Route path="/onboarding-output" element={<OnboardingOutput />} />
                  <Route path="/output" element={<Output />} />
                  <Route path="/workout" element={<Workout />} />
                  <Route path="/workout-output" element={<WorkoutOutput />} />
                  <Route path="/meditation" element={<Meditation />} />
                  <Route path="/bio-optimizer" element={<BioOptimizer />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
