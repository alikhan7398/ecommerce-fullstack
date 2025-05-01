import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    console.log("Attempting fetch to:", "http://localhost:5000/api/register");
    try {
      const url = "http://localhost:5000/api/register";
      console.log("Sending to:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.status === 201) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setMessage("Error registering user");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mb-5 py-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4 fw-bolder">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>

          <button className="btn btn-outline-dark w-100" type="submit">
            Register
          </button>
        </form>
        {message && <p className="text-center mt-3 text-danger">{message}</p>}
        <p className="text-center mt-3">
          Already have an account? <NavLink to="/login">Login here</NavLink>
        </p>
      </div>
    </div>
  );
}
