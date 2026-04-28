import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/SignUp.css";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.name || !input.email || !input.password) {
      alert("Please enter all details!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(input));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <form onSubmit={handleSubmit}>
          <h1 className="signup-title">Create Account</h1>

          <div className="signup-form">
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />

            <button className="signup-btn">Register</button>

            <p className="signup-text">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;