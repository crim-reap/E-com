import React, { useState } from 'react';
import "../components/Career.css";
import heroImg from "../assets/about/career-hero.png";

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
  });

  const handleChanges = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setValues({ ...values, [name]: files[0].name });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const applications = JSON.parse(localStorage.getItem("jobApplications")) || [];
    applications.push(values);
    localStorage.setItem("jobApplications", JSON.stringify(applications));

    alert("Application submitted successfully!");
    setValues({
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      gender: "",
      resume: "",
      url: "",
      education: "",
      about: ""
    });
  };

  return (
  <div className="career-page">

    <section
      className="career-hero"
      style={{ backgroundImage: `url(${heroImg})` }}
    ></section>

    <section className="career-benefits">
      <h2>Why Join DODODEX?</h2>

      <div className="benefit-grid">
        <div className="benefit-card">🍴 Free Meals & Snacks</div>
        <div className="benefit-card">🧑‍⚕️ Insurance Benefits</div>
        <div className="benefit-card">✈️ Paid Vacations</div>
        <div className="benefit-card">😁 Better Work-Life Balance</div>
        <div className="benefit-card">🍂 Indoor Garden Space</div>
        <div className="benefit-card">📈 Growth Opportunities</div>
      </div>
    </section>

    <section className="career-form-section full-center">
      <h2>Join Our Team</h2>
      <p>Fill out the form below and begin your journey with us.</p>

      <form className="contaainer d" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" name="firstname" placeholder="Enter your First Name" value={values.firstname} onChange={handleChanges} required />

        <label>Last Name</label>
        <input type="text" name="lastname" placeholder="Enter your Last Name" value={values.lastname} onChange={handleChanges} required />

        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your Email" value={values.email} onChange={handleChanges} required />

        <label>Phone No</label>
        <input type="tel" name="contact" placeholder="Enter your Phone No." value={values.contact} onChange={handleChanges} required />

        <label>Gender</label>

        <div className="radio-group">
          <label><input type="radio" name="gender" value="Female" onChange={handleChanges} /> Female</label>
          <label><input type="radio" name="gender" value="Male" onChange={handleChanges} /> Male</label>
          <label><input type="radio" name="gender" value="Other" onChange={handleChanges} /> Other</label>
        </div>

        <label>Resume</label>
        <input type="file" name="resume" onChange={handleChanges} />

        <label>Image URL</label>
        <input type="text" name="url" placeholder="Enter Image URL" value={values.url} onChange={handleChanges} />

        <label>Education</label>
        <input type="text" name="education" placeholder="Which degree you have" value={values.education} onChange={handleChanges} required />

        <label>About You</label>
        <textarea name="about" rows="5" placeholder="Tell us about yourself" value={values.about} onChange={handleChanges}></textarea>

        <button className="submit">Submit Application</button>
      </form>
    </section>

  </div>
);
}

export default Career;
