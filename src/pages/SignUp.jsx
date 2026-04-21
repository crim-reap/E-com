import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.name == "" || input.email == "" || input.password == "") {
            alert("please enter detail!")
        } else {
            localStorage.setItem("user", JSON.stringify(input));
            alert("signup successfully!");
            navigate("/login")
        }
    }
    return (
        <div>
            <div className="contain">
                <form onSubmit={handleSubmit} >
                    <div>
                        <h1 className="s">Sign Up</h1>
                    </div>
                    <div className="acc">
                        <input type="text" name="name" placeholder="Enter your Name" onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value, })} />
                        <input type="email" name="email" placeholder="Enter your Email" onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value, })} />
                        <input type="password" name="password" placeholder="Enter your Password" onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value, })} />
                        <button className="b">Register</button>
                        <p className="l">Already have an Account? <a href="/login">Log In</a>
                        </p>
                    </div>


                </form>
            </div>
        </div>
    )
}
export default SignUp;

