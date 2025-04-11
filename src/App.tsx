import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Home";
import Home from "./components/Home";
import ExercisePage from "./components/ExercisePage";
import ExerciseDetails from "./components/ExerciseDetails"; // ✅ Import ExerciseDetails

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exercises/:muscleGroup" element={<ExercisePage />} />
        <Route path="/exercise-details/:exerciseName" element={<ExerciseDetails />} /> 
        {/* ✅ Corrected route */}
      </Routes>
    </Router>
  );
};

export default App;
