import React, { useState } from "react";

interface FormData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  username: string;
  password: string;
  level: string;
}

interface LoginData {
  username: string;
  password: string;
}

const Auth: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    username: "",
    password: "",
    level: "Beginner",
  });

  const [loginData, setLoginData] = useState<LoginData>({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignup) {
      console.log("Signup Data:", formData);
      alert("Account created successfully! (Data logged in console)");
      setIsSignup(false);
    } else {
      console.log("Login Data:", loginData);
      alert("Login button clicked! (No validation for now)");
    }
  };

  return (
    <div style={{ backgroundColor: "#CBC3E3", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h2>{isSignup ? "Create an Account" : "Login"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        {isSignup && (
          <>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
            <select name="gender" onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} required />
            <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required />
            <select name="level" onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </>
        )}
        <input type="text" name="username" placeholder="Username" onChange={isSignup ? handleChange : handleLoginChange} required />
        <input type="password" name="password" placeholder="Password" onChange={isSignup ? handleChange : handleLoginChange} required />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)} style={{ marginTop: "10px", background: "none", border: "none", color: "blue", cursor: "pointer" }}>
        {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </button>
    </div>
  );
};

export default Auth;
