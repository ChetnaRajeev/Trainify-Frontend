import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import for navigation
import { FaCircleUser } from "react-icons/fa6"; // Importing user icon
import fullBodyImage from "../assets/fullbody.png";
import legsImage from "../assets/Leg.png";
import armsImage from "../assets/arms.png";
import chestImage from "../assets/Chest.png";
import coreImage from "../assets/Core.png";
import backImage from "../assets/Back.png";
import "../styles/Home.css"; // Importing CSS for styling
import { useUser } from "../context/UserContext";

const Home: React.FC = () => {
    const { username } = useParams<{ username: string }>(); // Get username from URL
    const { userName } = useUser(); // Get username from context
    const userNameFromParams = username || userName; // Fallback to context if URL doesn't provide it

    const today: number = new Date().getDate(); // Get today's date
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle muscle group selection
    const handleMuscleClick = (muscle: string) => {
        navigate(`/exercises/${muscle}`); // Navigate to exercise page dynamically
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Hello, {userNameFromParams}!</h1>
                <FaCircleUser size={45} />
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
