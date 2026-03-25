import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("userData", JSON.stringify({ email, password }));
    localStorage.setItem("loggedInUser", email);
    navigate("/goals");
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container glass-panel">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us and reach your goals</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="input-premium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="input-premium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="input-premium"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="btn-primary-premium auth-btn">
            SIGN UP
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign In</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
