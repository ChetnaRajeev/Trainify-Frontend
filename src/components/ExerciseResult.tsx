// src/pages/ExerciseResult.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ExerciseResult.css";

const ExerciseResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, exercise_name, reps, date, duration } = location.state || {};

  return (
    <div className="result-container">
      <h2>Workout Summary</h2>
      <div className="result-card">
        <p><strong>Exercise:</strong> {exercise_name}</p>
        <p><strong>Reps:</strong> {reps}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Duration:</strong> {duration} seconds</p>
        <p><strong>Rating:</strong> Good 💪</p>
      </div>
      <button className="go-back-btn" onClick={() => navigate(`/home/${userName}`)}>
        Back to Home
      </button>
    </div>
  );
};

export default ExerciseResult;
