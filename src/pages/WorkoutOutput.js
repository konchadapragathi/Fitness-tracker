import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkoutOutput.css";

function WorkoutOutput() {
    const [plan, setPlan] = useState([]);
    const [muscle, setMuscle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem("workoutPlanData");
        if (storedData) {
            const parsed = JSON.parse(storedData);
            setPlan(parsed.plan);
            setMuscle(parsed.muscle);
        }
    }, []);

    if (!plan || plan.length === 0) {
        return (
            <div className="workout-output-page animate-fade-in">
                <div className="empty-state glass-panel">
                    <div className="empty-icon">📂</div>
                    <h2>No workout plan found</h2>
                    <p>Please go back and select a muscle group to generate your plan.</p>
                    <button className="btn-primary-premium mt-3" onClick={() => navigate("/workout")}>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="workout-output-page animate-fade-in">
            <div className="page-container">
                <div className="page-header workout-output-header">
                    <button className="icon-btn mb-2" onClick={() => navigate("/workout")}>
                        &#8592;
                    </button>
                    <h1>📋 Your <span className="highlight-workout">{muscle}</span> Split</h1>
                    <p>Professional routine optimized for muscle fiber recruitment and recovery.</p>
                </div>

                <div className="workout-grid mt-5">
                    {plan.map((ex, i) => (
                        <div key={i} className="exercise-card glass-panel animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="exercise-card-header">
                                <div className="exercise-icon">🔥</div>
                                <h3>{ex.name}</h3>
                            </div>
                            {ex.instructions && (
                                <p className="exercise-instructions">
                                    {ex.instructions}
                                </p>
                            )}
                            <div className="exercise-details-footer">
                                <div className="detail-pill">
                                    <span className="pill-label">Sets</span>
                                    <span className="pill-value">{ex.sets}</span>
                                </div>
                                <div className="detail-pill">
                                    <span className="pill-label">Reps</span>
                                    <span className="pill-value">{ex.reps}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="output-footer">
                    <button className="secondary-action" onClick={() => navigate("/workout")}>
                        Generate Another Plan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WorkoutOutput;
