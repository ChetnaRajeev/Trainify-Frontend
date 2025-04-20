import { Keypoint } from "@tensorflow-models/pose-detection";
import { getJumpingJacksFeedback } from "./jumpingJacksFeedback";
import { getSquatFeedback } from "./squatsFeedback";

// Main feedback logic for Jumping Jacks exercise
export const getWorkoutFeedback = (
  exerciseName: string,
  keypoints: Keypoint[],
  countRef: React.RefObject<number>,
  setCountRef: React.RefObject<boolean>,
  initialFlagRef: React.RefObject<boolean>
) => {
  // initialize switch case
  switch (exerciseName) {
    case "Jumping Jacks":
      return getJumpingJacksFeedback(
        keypoints,
        countRef,
        setCountRef,
        initialFlagRef
      );

    case "Squats":
      return getSquatFeedback(
        keypoints,
        countRef,
        setCountRef,
        initialFlagRef
      );

    // Add more exercises here...

    default:
      return {
        feedback: "Exercise not recognized.",
        incorrectPairs: [],
      };
  }
};

// Note: The Incorrect Pairs can be further refined!