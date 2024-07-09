import React, { useState } from "react";
import { loginUser } from "../services/login";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    const response = await loginUser(identifier, password);
    console.log("Response:", response);
    if (response.status === 200) {
      setError("");
      localStorage.setItem("jwt-token", response.data.jwt);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: response.data.user.username,
          email: response.data.user.email,
          id: response.data.user.id,
        })
      );
      navigate("/chat");
    } else if (response.status == 400) {
      setError("Invalid identifier or password");
    }
  }

  return (
    <div className="login-container">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identifier">Identifier</label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
          <button type="submit">Login</button>
        </form>
        <div className="small-blue-text">
          Don't have an account? <Link to="/auth/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
