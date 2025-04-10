import React from "react";
import { useParams } from "react-router-dom";
import "../styles/ExerciseDetails.css";
import squatImage from "../assets/squating.png";

const exerciseInfo = {
  squat: {
    name: "SQUATS",
    image: squatImage,
    instructions: [
      "Stand up with your feet shoulder-width apart.",
      "Bend your knees, press your hips back and stop the movement once the hip joint is slightly lower than the knees.",
      "Press your heels into the floor to return to the initial position.",
      "Repeat until set is complete."
    ]
  }
};

const ExerciseDetails = () => {
  const { exerciseName } = useParams();
  const exercise = exerciseInfo[exerciseName];

  if (!exercise) {
    return <h1>Exercise Not Found</h1>;
  }

  return (
    <div className="exercise-details-container">
      <h1>You've Chosen {exercise.name}</h1>
      <div className="exercise-image-container">
        <img src={exercise.image} alt={exercise.name} />
      </div>
      <div className="exercise-instructions">
        {exercise.instructions.map((step, index) => (
          <p key={index}>{index + 1}. {step}</p>
        ))}
      </div>
      <button className="start-button">Start</button>
    </div>
  );
};

export default ExerciseDetails;
