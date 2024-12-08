import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    Geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.Geolocation
    ) {
      alert("All fields are required.");
      return;
    }

    const response = await fetch("http://localhost:8080/api/createuser", {
      method: "POST", // Corrected HTTP method
      headers: {
        "Content-Type": "application/json", // Fixed headers
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.Geolocation, // Ensure this matches your backend
      }),
    });

    const json = await response.json(); // Parse the response
    console.log(json);

    // Validate backend response
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      // alert("Signup successful");
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Geolocation" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="Geolocation"
            name="Geolocation"
            value={credentials.Geolocation}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">
          Already a user
        </Link>
      </form>
    </div>
  );
}
