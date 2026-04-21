import React, { useState } from 'react';

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
    <div>
      <h1>Career</h1>
      <p> lets hear the benefits of joining our company</p>
      <p className="ul">
        <ul>
          <li>free food</li>
          <li>insuarance benefits</li>
          <li>great paid vacation</li>
          <li>better life</li>
          <li>can touch grass as inside garden is available</li>
        </ul>

      </p>



      <h1> WANNA JOIN?
        fill the form

      </h1>
      <div className="contaainer">
        <div className='d' onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="firstname" placeholder="Enter your First Name" value={values.firstname} onChange={handleChanges} required />

          <label>Last Name:</label>
          <input type="text" name="lastname" placeholder="Enter your Last Name" value={values.lastname} onChange={handleChanges} required />

          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter your Email" value={values.email} onChange={handleChanges} required />

          <label>Phone No:</label>
          <input type="tel" name="contact" placeholder="Enter your Phone No." value={values.contact} onChange={handleChanges} required />

          <label>Gender:</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChanges} /> Female</label>
          <label><input type="radio" name="gender" value="Other" onChange={handleChanges} /> Other</label>
          <label><input type="radio" name="gender" value="Male" onChange={handleChanges} /> Male</label>

          <label>Resume:</label>
          <input type="file" name="resume" onChange={handleChanges} />

          <label>Image URL:</label>
          <input type="text" name="url" placeholder="Enter Image URL" value={values.url} onChange={handleChanges} />

          <label>Education:</label>
          <input type="text" name="education" placeholder="Which degree you have" value={values.education} onChange={handleChanges} required />

          <label>About You:</label>
          <textarea name="about" cols="30" rows="5" placeholder="Enter Description" value={values.about} onChange={handleChanges} />

          <button className="submit">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Career;
