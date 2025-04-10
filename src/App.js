import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ExercisePage from "./components/ExercisePage";
import ExerciseDetails from "./components/ExerciseDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises/:muscleGroup" element={<ExercisePage />} />
        <Route path="/exercise/:exerciseName" element={<ExerciseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
