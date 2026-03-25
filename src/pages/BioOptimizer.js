import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BioOptimizer.css";

function BioOptimizer() {
    const navigate = useNavigate();
    const [soreness, setSoreness] = useState(5);
    const [stress, setStress] = useState(5);
    const [energy, setEnergy] = useState(5);
    const [readiness, setReadiness] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const calculateReadiness = () => {
        // Advanced math for "Readiness"
        // Higher energy = better readiness
        // Lower soreness/stress = better readiness
        const score = Math.round(((energy + (10 - soreness) + (10 - stress)) / 30) * 100);
        setReadiness(score);
        setShowResults(true);
    };

    const getRecommendation = (score) => {
        if (score >= 85) return {
            status: "Primal State",
            cmd: "Unleash Maximum Intensity",
            desc: "Your central nervous system is fully recovered. This is the day to push for Personal Records.",
            color: "#10b981"
        };
        if (score >= 70) return {
            status: "Performance State",
            cmd: "Standard Training Volume",
            desc: "Good recovery. Follow your planned routine with confidence.",
            color: "#3b82f6"
        };
        if (score >= 50) return {
            status: "Maintenance State",
            cmd: "Focus on Technique",
            desc: "Moderate fatigue detected. Reduce weight by 10% and focus on perfect form.",
            color: "#f59e0b"
        };
        return {
            status: "Recovery State",
            cmd: "Active Restoration Only",
            desc: "High fatigue levels. Switch to light mobility, walking, or take a full rest day.",
            color: "#ef4444"
        };
    };

    const getSupplements = (score) => {
        if (score < 60) return [
            { name: "Magnesium Bisglycinate", dose: "400mg", timing: "Before Bed", icon: "💊" },
            { name: "Zinc Picolinate", dose: "30mg", timing: "With Meal", icon: "🛡️" },
            { name: "Tart Cherry Juice", dose: "250ml", timing: "Post-Workout", icon: "🍒" }
        ];
        return [
            { name: "Creatine Monohydrate", dose: "5g", timing: "Daily", icon: "⚡" },
            { name: "L-Citrulline", dose: "8g", timing: "Pre-Workout", icon: "🔥" },
            { name: "Beta-Alanine", dose: "3g", timing: "Pre-Workout", icon: "🧪" }
        ];
    };

    const currentRec = readiness !== null ? getRecommendation(readiness) : null;
    const supplements = readiness !== null ? getSupplements(readiness) : [];

    return (
        <div className="bio-page animate-fade-in">
            <div className="page-container bio-container">
                <div className="page-header bio-header">
                    <button className="icon-btn mb-2" onClick={() => navigate("/goals")}>
                        &#8592;
                    </button>
                    <h1>Bio-Optimizer <span className="lab-tag">LAB</span></h1>
                    <p>Analyze your biometrics to determine optimal training intensity.</p>
                </div>

                {!showResults ? (
                    <div className="optimizer-input glass-panel animate-slide-up">
                        <div className="input-section">
                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>Muscle Soreness</span>
                                    <span className="value-badge">{soreness}/10</span>
                                </div>
                                <input
                                    type="range" min="1" max="10"
                                    value={soreness} onChange={(e) => setSoreness(parseInt(e.target.value))}
                                    className="premium-range soreness-range"
                                />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>Mental Stress</span>
                                    <span className="value-badge">{stress}/10</span>
                                </div>
                                <input
                                    type="range" min="1" max="10"
                                    value={stress} onChange={(e) => setStress(parseInt(e.target.value))}
                                    className="premium-range stress-range"
                                />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>Energy Levels</span>
                                    <span className="value-badge">{energy}/10</span>
                                </div>
                                <input
                                    type="range" min="1" max="10"
                                    value={energy} onChange={(e) => setEnergy(parseInt(e.target.value))}
                                    className="premium-range energy-range"
                                />
                            </div>
                        </div>

                        <div className="optimizer-actions">
                            <button className="btn-primary-premium w-100" onClick={calculateReadiness}>
                                Analyze Readiness
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="optimizer-results animate-fade-in">
                        <div className="score-section glass-panel">
                            <div className="readiness-circle" style={{ borderColor: currentRec.color }}>
                                <span className="score-value">{readiness}%</span>
                                <span className="score-label">READY</span>
                            </div>
                            <div className="status-info mt-4">
                                <h2 style={{ color: currentRec.color }}>{currentRec.status}</h2>
                                <h3 className="command-text">{currentRec.cmd}</h3>
                                <p className="status-desc">{currentRec.desc}</p>
                            </div>
                        </div>

                        <div className="supplement-section mt-5">
                            <h3 className="section-title">Recommended Protocol</h3>
                            <div className="supplement-grid mt-4">
                                {supplements.map((s, i) => (
                                    <div key={i} className="supp-card glass-panel animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                        <div className="supp-icon">{s.icon}</div>
                                        <div className="supp-details">
                                            <h4>{s.name}</h4>
                                            <div className="supp-meta">
                                                <span>{s.dose}</span>
                                                <span className="dot">•</span>
                                                <span>{s.timing}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="footer-actions mt-5">
                            <button className="secondary-action w-100" onClick={() => setShowResults(false)}>
                                Recalculate
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BioOptimizer;
