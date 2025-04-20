import { Keypoint } from "@tensorflow-models/pose-detection";

export const getAngle = (a: Keypoint, b: Keypoint, c: Keypoint): number | null => {
  if (!a || !b || !c || a.score! < 0.5 || b.score! < 0.5 || c.score! < 0.5) return null;

  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180) / Math.PI);
  if (angle > 180) angle = 360 - angle;

  return angle;
};
