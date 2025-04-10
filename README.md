# Trainify - Frontend

Trainify is a web-based fitness application that helps users select workouts based on muscle groups and provides detailed exercise instructions. This repository contains the frontend built using **React.js**.

## 🚀 Features
- **Muscle Group Selection**: Choose workouts for specific muscle groups (Legs, Arms, Chest, Core, Back, Full Body).
- **Dynamic Exercise Page**: Displays exercises dynamically based on the selected muscle group.
- **Exercise Details Page**: Shows exercise instructions and an image.
- **User Authentication**: Login and Signup (Backend API integration pending).
- **Responsive Design**: Works across mobile and desktop devices.

## 🛠️ Tech Stack
- **Frontend**: React.js, React Router
- **Styling**: CSS, Flexbox, Grid
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router

## 📂 Project Structure
```
trainify/
│── public/
│── src/
│   ├── assets/              # Images and static assets
│   ├── components/
│   │   ├── Home.js          # Home Page
│   │   ├── ExercisePage.js  # Dynamic Exercise List Page
│   │   ├── ExerciseDetails.js # Exercise Details Page
│   │   ├── Auth.js          # Login & Signup
│   ├── styles/              # CSS files
│   ├── App.js               # Main App component
│   ├── index.js             # Entry point
│── package.json             # Dependencies and scripts
│── README.md                # Project Documentation
```

## 🏗️ Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/trainify-frontend.git
cd trainify-frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the development server
```bash
npm start
```
Your app will be available at **http://localhost:3000/**.

## 🔧 How to Use
1. **Home Page**: Select a muscle group.
2. **Exercise Page**: View the list of workouts.
3. **Exercise Details Page**: Read instructions and start the workout.

## 🔮 Future Enhancements
- **API Integration** for user authentication and workout tracking.
- **Personalized Workout Plans** based on user fitness level.
- **Progress Tracking** with workout history.

## 📜 License
This project is licensed under the MIT License.

---
💪 **Train hard, stay fit!** 🚀

