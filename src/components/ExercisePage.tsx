import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ExercisePage.css";
import squatImage from "../assets/squat.png";
import lungeImage from "../assets/lunge.png";
import calfRaiseImage from "../assets/calf_raises.png";

const exercisesData: { [key: string]: { name: string; image: string }[] } = {
  legs: [
    { name: "Squat", image: squatImage },
    { name: "Lunge", image: lungeImage },
    { name: "Calf Raise", image: calfRaiseImage },
  ],
};

const ExercisePage: React.FC = () => {
  const { muscleGroup } = useParams<{ muscleGroup: string }>();
  const navigate = useNavigate();

  const exercises = exercisesData[muscleGroup || ""] || [];

  const handleExerciseClick = (exerciseName: string) => {
    console.log(`Navigating to /exercise-details/${exerciseName.toLowerCase()}`); // ✅ Debugging
    navigate(`/exercise-details/${exerciseName.toLowerCase()}`);
  };

  return (
    <div className="exercise-container">
      <h1>{muscleGroup?.toUpperCase()} EXERCISES</h1>
      <div className="exercise-list">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div 
              key={exercise.name} 
              className="exercise-card" 
              onClick={() => handleExerciseClick(exercise.name)}
            >
              <p>{exercise.name.toUpperCase()}</p>
              <img src={exercise.image} alt={exercise.name} />
            </div>
          ))
        ) : (
          <p>No exercises available.</p>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;
