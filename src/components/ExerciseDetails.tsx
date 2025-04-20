import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ExerciseDetails.css";

// Importing all exercise images
import squatImage from "../assets/squating.png";
import pushupsImage from "../assets/pushup_ExerciseDetails.png";
import jumpingJacksImage from "../assets/JumpingJacks_ExcerciseDetails.png";
import bicepCurlImage from "../assets/BicepCurl_ExerciseDetails.png";

// Add all exercise data here
const exerciseInfo: {
  [key: string]: {
    name: string;
    image: string;
    instructions: string[];
  };
} = {
  squats: {
    name: "SQUATS",
    image: squatImage,
    instructions: [
      "Stand up with your feet shoulder-width apart.",
      "Bend your knees, press your hips back and stop the movement once the hip joint is slightly lower than the knees.",
      "Press your heels into the floor to return to the initial position.",
      "Repeat until set is complete.",
    ],
  },
  pushups: {
    name: "PUSHUPS",
    image: pushupsImage,
    instructions: [
      "Place your hands slightly wider than shoulder-width apart on the ground.",
      "Extend your legs back so you're balanced on your hands and toes.",
      "Lower your body until your chest nearly touches the floor.",
      "Push yourself back up to the starting position.",
      "Repeat the movement.",
    ],
  },
  "jumping jacks": {
    name: "JUMPING JACKS",
    image: jumpingJacksImage,
    instructions: [
      "Stand upright with your legs together and arms at your sides.",
      "Jump while spreading your legs shoulder-width apart and raising your arms overhead.",
      "Jump again to return to the starting position.",
      "Repeat for the desired number of reps.",
    ],
  },
  "bicep curl": {
    name: "BICEP CURL",
    image: bicepCurlImage,
    instructions: [
      "Stand with a dumbbell in each hand, arms at your sides, and palms facing forward.",
      "Keeping your elbows close to your torso, curl the weights while contracting your biceps.",
      "Bring the dumbbells to shoulder level, then slowly lower them back.",
      "Repeat the movement for the desired number of reps.",
    ],
  },
};

const ExerciseDetails: React.FC = () => {
  const { exerciseName } = useParams<{ exerciseName: string }>();
  // Make the exerciseName title case
  const formattedName = (exerciseName || "").toLowerCase();
  const trackingFormattedName = exerciseName ? exerciseName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "";

  console.log("Exercise Name: ", trackingFormattedName);

  const exercise = exerciseInfo[formattedName as keyof typeof exerciseInfo];

  // Navigate variable
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to the ExerciseTracking page for the given exercise
    navigate(`/exercise-tracking/${trackingFormattedName}`);
  }

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
          <p key={index}>
            {index + 1}. {step}
          </p>
        ))}
      </div>
      <button className="start-button" onClick={() => {handleStart()}} >Start</button>
    </div>
  );
};

export default ExerciseDetails;
