import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ExercisePage.css";

// Import all images
const squatImage = "https://trainify-assets-s3.s3.us-east-1.amazonaws.com/assets/squat.png";
const lungeImage = "https://trainify-assets-s3.s3.us-east-1.amazonaws.com/assets/lunge.png";
const calfRaiseImage = "https://trainify-assets-s3.s3.us-east-1.amazonaws.com/assets/calf_raises.png";
const bicepCurlImage = "https://trainify-assets-s3.s3.us-east-1.amazonaws.com/assets/BicepCurl_Exercis.png";
const jumpingJacksImage = "https://trainify-assets-s3.s3.us-east-1.amazonaws.com/assets/JumpingJacks_ExcerciseDetails.png";
const pushupsImage = "https://trainify-assets-s3.s3.us-east-1.amazonaws.com/assets/pushup_exercisepage.png";

const exercisesData: { [key: string]: { name: string; image: string }[] } = {
  legs: [
    { name: "Squats", image: squatImage },
    { name: "Lunge", image: lungeImage },
    { name: "Calf Raise", image: calfRaiseImage },
  ],
  arms: [
    { name: "Bicep Curl", image: bicepCurlImage },
  ],
  fullbody: [
    { name: "Jumping Jacks", image: jumpingJacksImage },
    { name: "Pushups", image: pushupsImage },
  ]
};

const ExercisePage: React.FC = () => {
  const { muscleGroup } = useParams<{ muscleGroup: string }>();
  const navigate = useNavigate();

  const normalizedGroup = (muscleGroup || "").toLowerCase();
  const exercises = exercisesData[normalizedGroup] || [];

  const handleExerciseClick = (exerciseName: string) => {
    console.log(`Navigating to /exercise-details/${exerciseName}`);
    navigate(`/exercise-details/${exerciseName.toLowerCase()}`);
  };

  return (
    <div className="exercise-container">
      <h1 className="exercise-title">{normalizedGroup.toUpperCase()} EXERCISES</h1>
      <div className="exercise-list">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div 
              key={exercise.name} 
              className="exercise-card" 
              onClick={() => handleExerciseClick(exercise.name)}
            >
              <div className="exercise-name">{exercise.name}</div>
              <img src={exercise.image} alt={exercise.name} className="exercise-image" />
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
