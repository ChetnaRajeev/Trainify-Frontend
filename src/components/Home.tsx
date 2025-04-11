import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./Home.css";
import profileIcon from "../assets/Profile.png"; 
import fullBodyImage from "../assets/fullbody.png";
import legsImage from "../assets/Leg.png";
import armsImage from "../assets/arms.png";
import chestImage from "../assets/Chest.png";
import coreImage from "../assets/Core.png";
import backImage from "../assets/Back.png";

const Home: React.FC = () => {
    const userName: string = "Cera"; // Replace with dynamic user data
    const today: number = new Date().getDate(); // Get today's date
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle muscle group selection
    const handleMuscleClick = (muscle: string) => {
        navigate(`/exercises/${muscle}`); // Navigate to exercise page dynamically
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Hello, {userName}!</h1>
                <img src={profileIcon} alt="Profile" className="profile-icon" />
            </header>

            <section className="workout-selection">
                <h2>Choose your target muscle group and start your workout!</h2>
                <div className="muscle-groups">
                    <div className="muscle-group" onClick={() => handleMuscleClick("fullbody")}>
                        <img src={fullBodyImage} alt="Full Body" />
                        <p>FULL BODY</p>
                    </div>
                    <div className="muscle-group" onClick={() => handleMuscleClick("legs")}>
                        <img src={legsImage} alt="Legs" />
                        <p>LEGS</p>
                    </div>
                    <div className="muscle-group" onClick={() => handleMuscleClick("arms")}>
                        <img src={armsImage} alt="Arms" />
                        <p>ARMS</p>
                    </div>
                    <div className="muscle-group" onClick={() => handleMuscleClick("chest")}>
                        <img src={chestImage} alt="Chest" />
                        <p>CHEST</p>
                    </div>
                    <div className="muscle-group" onClick={() => handleMuscleClick("core")}>
                        <img src={coreImage} alt="Core" />
                        <p>CORE</p>
                    </div>
                    <div className="muscle-group" onClick={() => handleMuscleClick("back")}>
                        <img src={backImage} alt="Back" />
                        <p>BACK</p>
                    </div>
                </div>
            </section>

            <section className="workout-calendar">
                <div className="calendar-container">
                    <h2>April 2025</h2>
                    <div className="calendar-grid">
                        {Array.from({ length: 30 }, (_, index) => (
                            <div
                                key={index}
                                className={`calendar-day ${index + 1 === today ? "today" : ""}`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
