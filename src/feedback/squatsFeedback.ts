import { Keypoint } from "@tensorflow-models/pose-detection";
import { getAngle } from "../utils/getAngle";

// Main feedback logic for Squats exercise
export const getSquatFeedback = (
    keypoints: Keypoint[],
    countRef: React.RefObject<number>,
    setCountRef: React.RefObject<boolean>,
    initialFlagRef: React.RefObject<boolean>
  ) => {
    // Get joints for both arms and legs
    const leftHip = keypoints[11];
    const leftKnee = keypoints[13];
    const leftAnkle = keypoints[15];
  
    const rightHip = keypoints[12];
    const rightKnee = keypoints[14];
    const rightAnkle = keypoints[16];

    const leftShoulder = keypoints[5];
    const rightShoulder = keypoints[6];

    // Calculate angles
    const leftHipKneeAnkleAngle = getAngle(leftHip, leftKnee, leftAnkle);
    const rightHipKneeAnkleAngle = getAngle(rightHip, rightKnee, rightAnkle);

    const leftHipAngle = getAngle(leftShoulder, leftHip, leftKnee);
    const rightHipAngle = getAngle(rightShoulder, rightHip, rightKnee);

    // Normal Stage: Standing Straight
    const normalStage = leftHipKneeAnkleAngle && leftHipKneeAnkleAngle >= 150 && rightHipKneeAnkleAngle && rightHipKneeAnkleAngle >= 150; // legs straight
  
    // Squatted Stage: Deep Squat Position
    const squattedStage = leftHipKneeAnkleAngle && leftHipKneeAnkleAngle < 100 && rightHipKneeAnkleAngle && rightHipKneeAnkleAngle < 100
                && leftHipAngle && leftHipAngle < 140 && rightHipAngle && rightHipAngle < 140; // legs squatted
  
    let feedback = "Start Squats";
    let incorrectPairs: number[][] = [];
  
    // Feedback logic
    if (normalStage && initialFlagRef.current) {
      feedback = "Good! Squat Down, Bring your arms parallel to Ground!";
    }
  
    else if (squattedStage) {
      initialFlagRef.current = false;
      setCountRef.current = false; // Only count when in squatted stage
      feedback = "Nice! Now come back up!";
    }
  
    else if (!squattedStage && normalStage) {
      if (!setCountRef.current) {
        countRef.current += 1;
        setCountRef.current = true;
      }
      feedback = "Great! Now Squat down.";
    }


    // Check whether the hip angle is less than 120
    if (leftHipAngle && leftHipAngle < 140 && rightHipKneeAnkleAngle && rightHipKneeAnkleAngle > 140 && !squattedStage) {
      feedback = "Dont Pull your Leg up!";
      incorrectPairs.push([11, 13]);

      // check if the left leg is parallel to the ground
      if (leftHipKneeAnkleAngle && leftHipKneeAnkleAngle > 140) {
        feedback = "Not a Squat, Bring leg Down!";
        incorrectPairs.push([13, 15]);
      }
    }
    if (rightHipAngle && rightHipAngle < 140 && leftHipKneeAnkleAngle && leftHipKneeAnkleAngle > 140 && !squattedStage) {
      feedback = "Dont Pull your Leg up!";
      incorrectPairs.push([12, 14]);
      // check if the right leg is parallel to the ground
      if (rightHipKneeAnkleAngle && rightHipKneeAnkleAngle > 140) {
        feedback = "Not a Squat, Bring leg Down!";
        incorrectPairs.push([14, 16]);
      }

    }

    return {
      feedback,
      incorrectPairs, // Return the list of incorrect body parts for drawing feedback
    };
  };
  