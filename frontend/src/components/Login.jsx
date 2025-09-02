import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));

      window.dispatchEvent(new Event("auth-changed"));

      alert(`Logged in successfully! Welcome, ${user.name}`);

      setEmail("");
      setPassword("");

      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="auth-logo">SAARTHI</h1>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
