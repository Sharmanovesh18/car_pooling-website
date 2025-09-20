import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed, try again");
        return;
      }

      alert("Login successful!");
      // Save user info to localStorage (optional)
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
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



