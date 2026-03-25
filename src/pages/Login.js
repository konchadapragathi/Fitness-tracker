import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
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
          <h2>Welcome Back</h2>
          <p>Login to continue your journey</p>
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
              placeholder="Enter your password"
            />
          </div>

          <div className="forgot-password">
            <span>Forgot password?</span>
          </div>

          <button type="submit" className="btn-primary-premium auth-btn">
            LOG IN
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
