import { Keypoint } from "@tensorflow-models/pose-detection";
import { getAngle } from "../utils/getAngle";

// Main feedback logic for Jumping Jacks exercise
export const getJumpingJacksFeedback = (
  keypoints: Keypoint[],
  countRef: React.RefObject<number>,
  setCountRef: React.RefObject<boolean>,
  initialFlagRef: React.RefObject<boolean>
) => {
  // Get joints for both arms and legs
  const leftShoulder = keypoints[5];
  const leftElbow = keypoints[7];
  const leftWrist = keypoints[9];

  const rightShoulder = keypoints[6];
  const rightElbow = keypoints[8];
  const rightWrist = keypoints[10];

  const leftHip = keypoints[11];
  const leftAnkle = keypoints[15];

  const rightHip = keypoints[12];
  const rightAnkle = keypoints[16];

  const leftKnee = keypoints[13];
  const rightKnee = keypoints[14];

  // Calculate arm angles
  const leftElbowAngle = getAngle(leftShoulder, leftElbow, leftWrist);
  const rightElbowAngle = getAngle(rightShoulder, rightElbow, rightWrist);

  // Calculate knee angles
  const leftKneeAngle = getAngle(leftHip, leftKnee, leftAnkle);
  const rightKneeAngle = getAngle(rightHip, rightKnee, rightAnkle);

  // Calculate shoulder angles
  const leftShoulderAngle = getAngle(leftHip, leftShoulder, leftElbow);
  const rightShoulderAngle = getAngle(rightHip, rightShoulder, rightElbow);

  // Get Leg Spread Ratio
  const legDistance = Math.abs(leftAnkle.x - rightAnkle.x);
  const shoulderDistance = Math.abs(leftShoulder.x - rightShoulder.x);
  const legSpreadRatio = legDistance / shoulderDistance; // Shoulder distance is always the same, so this provides a good ratio

  // Initialize incorrect pairs
  const incorrectPairs: number[][] = [];

  // Conditions for feedback and tracking
  let feedback = "Start Jumping Jacks!";
  const bottomStage = leftShoulderAngle && leftShoulderAngle < 60 && rightShoulderAngle && rightShoulderAngle < 60 && legSpreadRatio < 1;
  const topStage = leftShoulderAngle && leftShoulderAngle > 150 && rightShoulderAngle && rightShoulderAngle > 150 && legSpreadRatio > 1.5;

  if (bottomStage && initialFlagRef.current) {
    feedback = "Extend your Legs, and Bring your Arms Up!";
  }

  else if (topStage) {
    initialFlagRef.current = false;
    setCountRef.current = false; // Only count when in the "top" stage
    feedback = "Great! Now jump down.";
  }

  else if (bottomStage && !topStage) {
    if (!setCountRef.current) {
      countRef.current += 1;
      setCountRef.current = true; // Ensure the count only increases once
    }
    feedback = "Great! Now jump up.";
  }

  // Posture correction: Check for elbow angles
  if (leftElbowAngle && leftElbowAngle < 145) {
    feedback = "Keep your elbow straight!";
    incorrectPairs.push([7, 9]); // Left elbow to left wrist
  }

  if (rightElbowAngle && rightElbowAngle < 145) {
    feedback = "Keep your elbow straight!";
    incorrectPairs.push([8, 10]); // Right elbow to right wrist
  }

  // Posture correction: Check for knee angles
  if (leftKneeAngle && leftKneeAngle < 145) {
    feedback = "Keep your knee straight!";
    incorrectPairs.push([11, 13]); // Left hip to left knee
  }

  if (rightKneeAngle && rightKneeAngle < 145) {
    feedback = "Keep your knee straight!";
    incorrectPairs.push([12, 14]); // Right hip to right knee
  }

  // If only arms raised up, push to incorrect pairs
  if (leftShoulderAngle && leftShoulderAngle > 80 && legSpreadRatio && rightShoulderAngle && rightShoulderAngle > 80 && legSpreadRatio < 1) {
    incorrectPairs.push([5, 7]); // Left shoulder to left elbow
    incorrectPairs.push([6, 8]); // Right shoulder to right elbow
    incorrectPairs.push([7, 9]); // Left elbow to left wrist
    incorrectPairs.push([8, 10]); // Right elbow to right wrist
    feedback = "NOT A JUMPING JACK. Extend BOTH LEGS and ARMS!"; // Feedback for incorrect posture
  }

    // If only legs are spread, push to incorrect pairs
  if (legSpreadRatio && legSpreadRatio > 1.5 && leftShoulderAngle && leftShoulderAngle < 60 && rightShoulderAngle && rightShoulderAngle < 60) {
    incorrectPairs.push([11, 13]); // Left hip to left ankle
    incorrectPairs.push([12, 14]); // Right hip to right ankle
    incorrectPairs.push([13, 15]); // Left knee to left ankle
    incorrectPairs.push([14, 16]); // Right knee to right ankle
    feedback = "NOT A JUMPING JACK. Extend BOTH ARMS and LEGS!"; // Feedback for incorrect posture
  }

  return {
    feedback,
    incorrectPairs, // Return the list of incorrect body parts for drawing feedback
  };
};
