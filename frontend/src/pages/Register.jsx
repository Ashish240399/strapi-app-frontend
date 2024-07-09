import React, { useState } from "react";
import { registerUser } from "../services/register";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add registration logic here
    register();
  };

  async function register() {
    const response = await registerUser(username, email, password);
    if (response.status === 200) {
      setError("");
      navigate("/auth/login");
    } else {
      console.log(response);
      setError(response.data.error.message);
    }
  }

  return (
    <div className="register-container">
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="credential-error">{error}</div>
          <button type="submit">Register</button>
        </form>
        <div className="small-blue-text">
          Already have an account? <Link to="/auth/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
