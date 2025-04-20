import React, { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs-core";
import * as posedetection from "@tensorflow-models/pose-detection";
import "../styles/ExerciseTracking.css";
import { getWorkoutFeedback } from "../feedback";
import { drawPoseLandmarksAndConnections } from "../utils/drawUtils";
import { useNavigate, useParams } from "react-router-dom";
import { sendProgressToBackend } from "../utils/sendProgress";
import { useUser } from "../context/UserContext";

const ExerciseTracking: React.FC = () => {
  const { userName } = useUser();
  const { exerciseName } = useParams<{ exerciseName: string }>();
  const exercise = exerciseName ?? "None";
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [detector, setDetector] = useState<posedetection.PoseDetector | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  const [feedback, setFeedback] = useState("Start Jumping Jacks!");
  const count = useRef<number>(0);
  const setCount = useRef(false);
  const initialFlag = useRef(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const init = async () => {
      await tf.setBackend("webgl");
      await tf.ready();

      const model = posedetection.SupportedModels.MoveNet;
      const detector = await posedetection.createDetector(model, {
        modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      });
      setDetector(detector);
    };

    init();

    return () => {
      if (detector) {
        detector.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!detector || !isMobile) return;
  
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });
  
        video.srcObject = stream;
  
        await new Promise((resolve) => {
          video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            resolve(true);
          };
        });
  
        video.play();
        setStartTime(Date.now());
        setIsCameraReady(true);  // 🟢 Trigger detectPose via next useEffect
      } catch (err) {
        console.error("Camera error:", err);
        setFeedback("Camera error. Please refresh and allow camera access.");
        setIsLoading(false);
      }
    };
  
    setupCamera();
  
    return () => {
      if (video?.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [detector, isMobile, exercise]);
  
  useEffect(() => {
    if (!isCameraReady || !detector) return;
  
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!video || !canvas || !ctx) return;
  
    const detectFrame = async () => {
      if (!video || video.readyState !== 4) {
        requestAnimationFrame(detectFrame);
        return;
      }
  
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const poses = await detector.estimatePoses(video);
      if (poses.length > 0) {
        const keypoints = poses[0].keypoints;
        const { feedback: newFeedback, incorrectPairs } = getWorkoutFeedback(
          exercise,
          keypoints,
          count,
          setCount,
          initialFlag
        );
        setFeedback(newFeedback);
        drawPoseLandmarksAndConnections(keypoints, ctx, incorrectPairs, exercise);
      }
  
      requestAnimationFrame(detectFrame);
    };
  
    detectFrame();
    setIsLoading(false); // ✅ Move here so it happens only after detection begins
  
  }, [isCameraReady, detector, exercise]);
  

  const handleFinishExercise = async () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }

    const endTime = Date.now();
    const durationInSeconds = startTime
      ? Math.floor((endTime - startTime) / 1000)
      : 0;

    const response = await sendProgressToBackend({
      user_name: userName,
      exercise_name: exercise,
      date_exercised: new Date().toISOString().split("T")[0],
      reps: count.current,
      duration: durationInSeconds,
    });

    if (response.success) {
      console.log("Progress logged successfully!");
    } else {
      console.error("Failed to log progress.");
    }

    navigate("/exercise-result", {
      state: {
        userName: userName,
        exercise_name: exercise,
        reps: count.current,
        date: new Date().toISOString().split("T")[0],
        duration: durationInSeconds,
      },
    });
  };

  if (!isMobile) {
    return (
      <div className="fullscreen-black-center">
        <h1 className="text-white-center">
          This React Application is not yet responsive for PC Screens.
        </h1>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Feedback */}
      <div className="feedback-section">
        <div className="feedback-header">
          <div className="feedback-left">
            <h3 className="feedback-exercise">Exercise: {exercise}</h3>
            <h3 className="feedback-reps">Reps: {count.current}</h3>
          </div>
          <button className="finish-button" onClick={handleFinishExercise}>
            Finish
          </button>
        </div>
        <h3 className="feedback-text">{feedback}</h3>
      </div>

      {/* Camera or Loading */}
      <div className="camera-container">
        {isLoading ? (
          <div className="loading-placeholder">
            <div className="spinner" />
            <p>Loading model and camera...</p>
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} className="mirrored-canvas" />
            <video ref={videoRef} playsInline muted className="hidden-video" />
          </>
        )}
      </div>
    </div>
  );
};

export default ExerciseTracking;
