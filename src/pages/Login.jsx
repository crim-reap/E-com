import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/Login.css";

const Login = ({ onLogin }) => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (input.email === "" || input.password === "") {
            alert("Please enter correct details!");
        } else {
            const getDetails = JSON.parse(localStorage.getItem("user"));
            if (
                getDetails &&
                input.email === getDetails.email &&
                input.password === getDetails.password
            ) {
                alert("Login successful");
                onLogin(getDetails);
                navigate("/");
            } else {
                setMessage("Invalid email or password");
            }
        }
    };

    return (
        <div>
            <p className='msg'>{message}</p>
            <div className="contain">
                <form onSubmit={handleLogin}>
                    <h1 className="s">Login</h1>
                    <div className="acc">
                        <input type="email" name="email" placeholder="Enter your Email"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                        <input type="password" name="password" placeholder="Enter your Password"
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                        <button className="b">Login</button>
                        <p className="l">Don't have an Account? <a href="/signup">Create here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
