import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import ExercisePage from "./components/ExercisePage";
import ExerciseDetails from "./components/ExerciseDetails"; // ✅ Import ExerciseDetails
import ExerciseTracking from "./components/ExerciseTracking";
import { UserProvider } from "./context/UserContext";
import ExerciseResult from "./components/ExerciseResult";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home/:username" element={<Home />} />
          <Route path="/exercises/:muscleGroup" element={<ExercisePage />} />
          <Route path="/exercise-details/:exerciseName" element={<ExerciseDetails />} />
          <Route path="/exercise-tracking/:exerciseName" element={<ExerciseTracking />} />
          <Route path="/exercise-result" element={<ExerciseResult />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
