import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    const userDetail = {
        name: "",
        email: "",
        password: ""
    }
    const navigate = useNavigate();

    const [data, setData] = useState(userDetail);
    const handleInput = (event) => {
        console.log(event.target.value);
        console.log(event.target.name);
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (data.name == "" || data.email == "" || data.password == "") {
            alert("please enter detail!")
        } else {
            const getData = JSON.parse(localStorage.getItem("user") || "[]");
            let arr = [];
            arr = [getData];
            arr.push(data)
            localStorage.setItem("user", JSON.stringify(arr));
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
                        <input type="text" name="name" placeholder="Enter your Name" onChange={handleInput} />
                        <input type="email" name="email" placeholder="Enter your Email" onChange={handleInput} />
                        <input type="password" name="password" placeholder="Enter your Password" onChange={handleInput} />
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









import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if ("email" == name) {
            setEmail(value)
        }
        if ("password" == name) {
            setPassword(value)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (email == "" || password == "") {
            alert("please enter correct details!");
        }
        else {
            let getDetails = JSON.parse(localStorage.getItem("user"))
            console.log(getDetails);
            getDetails.map((curValue) => {
                console.log(curValue.password);
                let storeEmail = curValue.email;
                let storePassword = curValue.password;

                if (storeEmail == email && storePassword == password) {
                    alert("login succesful");
                    navigate("/hoome");

                } else {
                    setMessage("Invalid email or passowrd")
                }

            })
        }
    }

    return (
        <div>
            <p className='msg'>{message}</p>
            <div className="contain">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1 className="s">Login</h1>
                    </div>
                    <div className="acc">
                        <input type="email" name="email" placeholder="Enter your Email" onChange={handleInput} />
                        <input type="password" name="password" placeholder="Enter your Password" onChange={handleInput} />
                        <button className="b">Login</button>
                        <p className="l">Don't have an Account? <a href="/signup">Create here</a>
                        </p>
                    </div>


                </form>
            </div>
        </div>
    )
}
export default Login;







import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const handleLogin = (e) => {
        e.preventDefault();
        if (input.email == "" || input.password == "") {
            alert("please enter correct details!");
        }
        else {
            const getDetails = JSON.parse(localStorage.getItem("user"));

            if (input.email === getDetails.email && input.password === getDetails.password) {
                alert("login succesful");
                navigate("/");

            } else {
                setMessage("Invalid email or passowrd")
            }

        }
    }


    return (
        <div>
            <p className='msg'>{message}</p>
            <div className="contain">
                <form onSubmit={handleLogin}>
                    <div>
                        <h1 className="s">Login</h1>
                    </div>
                    <div className="acc">
                        <input type="email" name="email" placeholder="Enter your Email" onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value, })} />
                        <input type="password" name="password" placeholder="Enter your Password" onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value, })} />
                        <button className="b">Login</button>
                        <p className="l">Don't have an Account? <a href="/signup">Create here</a>
                        </p>
                    </div>


                </form>
            </div>
        </div>
    )
}
export default Login;




import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Career from './pages/Career';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import ShoppingCart from './pages/ShoppingCart';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
<link href="https://fonts.googleapis.com/css2?family=Edu+QLD+Hand:wght@400..700&family=Joti+One&family=Michroma&display=swap" rel="stylesheet"></link>
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shoppingcart" element={< ShoppingCart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;





import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

<link href="https://fonts.googleapis.com/css2?family=Edu+QLD+Hand:wght@400..700&family=Joti+One&family=Michroma&display=swap" rel="stylesheet"></link>
function Navbar() {
  return (
    <header className="navbar">
      <h1 className="name">Dododex</h1>
      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/product">Products</Link>
        <Link to="/career">Career</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/wishlist"><FontAwesomeIcon icon={faHeart} /></Link>
        <Link to="/shoppingcart"><FontAwesomeIcon icon={faCartShopping} /></Link>
        <Link to="/signup">Register</Link>
        <button className='button'>Log out</button>




      </nav>
    </header>
  );
}

export default Navbar;





import React from 'react'
import { useState } from 'react';
function Career() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    gender: "",
    resume: "",
    url: "",
    education: "",
    about: ""
  })
  const handleChanges = (e) => {
    setValues({ ...values, [e.taarget.name]: [e.target.value] })
  }
  const handleSubmit = (e) => {
    e.preventDeafault()
    console.log(values)
  }


  return (
    <div>
      <h1>Career</h1>
      {/* <p> lets hear the benefits of joining our company</p>
      <p className="ul">
        <ul>
          <li>free food</li>
          <li>insuarance benefits</li>
          <li>great paid vacation</li>
          <li>better life</li>
          <li>can touch grass as inside garden is available</li>
        </ul>

      </p> */}
      <div className="contaainer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name:   </label>
          <input type="text" name="fsname" placeholder="Enter your First Name" onChange={(e) => handleChanges(e)} required />

          <label htmlFor="lastname">Last Name:   </label>
          <input type="text" name="lsname" placeholder="Enter your Last Name" onChange={(e) => handleChanges(e)} required />

          <label htmlFor="email">Email:   </label>
          <input type="email" name="name" placeholder="Enter your Email" onChange={(e) => handleChanges(e)} required />

          <label htmlFor="contact">Phone No:   </label>
          <input type="integer" name="name" placeholder="Enter your Phone No." onChange={(e) => handleChanges(e)} required />

          <label htmlFor="gender">Gender  </label>
          <input type="radio" name="gender" onChange={(e) => handleChanges(e)} /> Female
          <input type="radio" name="gender" onChange={(e) => handleChanges(e)} /> Other
          <input type="radio" name="gender" onChange={(e) => handleChanges(e)} /> male

          <label htmlFor="resume">Resume:   </label>
          <input type="file" name="resume" placeholder="Select Resume." onChange={(e) => handleChanges(e)} />

          <label htmlFor="url">URL:   </label>
          <input type="text" name="url" placeholder="Enter Image URL" onChange={(e) => handleChanges(e)} />

          <label htmlFor="eductaion">Education:   </label>
          <input type="text" name="edu" placeholder="Which degree you have" onChange={(e) => handleChanges(e)} required />

          <label htmlFor="about">About you:   </label>
          <textarea name="about" id="about" cols="30" roll='10' placeholder="Enter Description" onChange={(e) => handleChanges(e)} />
          <button className="submit">Submit</button>

        </form>


      </div>


    </div>
  )
}
export default Career;



