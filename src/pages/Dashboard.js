// src/pages/Dashboard.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">HOME</a>
        </div>
      </nav>

      {/* Strength Training Section */}
      <div className="video-container">
        <video src="images/prasad1.mp4" autoPlay muted loop></video>
        <div className="centered-text text-center text-white">
          <h1>Strength Training</h1>
          <p>Push your limits. Track your progress. Own your journey.</p>
          <input type="text" placeholder="Enter muscle (e.g. chest)" className="form-control mt-3" />
          <button className="btn btn-primary mt-3">Get Started</button>
        </div>
      </div>

      {/* Add other sections (Fat Loss, Fitness Tracking, Workout Plans, Footer) here */}
    </div>
  );
}

export default Dashboard;
