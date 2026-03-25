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

function App() {
  return (
    <Router>
      <Routes>
        {/* Start with Welcome page */}
        <Route path="/" element={<Welcome />} />
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        {/* Signup page (optional) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />

        {/* Protected routes */}
        <Route
          path="/strength"
          element={
            <ProtectedRoute>
              <Strength />
            </ProtectedRoute>
          }
        />
        <Route path="/strength-output" element={<StrengthOutput />} />
        <Route
          path="/fatloss"
          element={
            <ProtectedRoute>
              <FatLoss />
            </ProtectedRoute>
          }
        />
        <Route path="/fatloss-output" element={<FatLossOutput />} />
        <Route
          path="/tracking"
          element={
            <ProtectedRoute>
              <Tracking />
            </ProtectedRoute>
          }
        />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/onboarding-output" element={<OnboardingOutput />} />
        <Route path="/output" element={<Output />} />
        <Route
          path="/workout"
          element={
            <ProtectedRoute>
              <Workout />
            </ProtectedRoute>
          }
        />
        <Route path="/workout-output" element={<WorkoutOutput />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/bio-optimizer" element={<BioOptimizer />} />
        <Route path="/goals" element={<ProtectedRoute>
          <Goals />
        </ProtectedRoute>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;
