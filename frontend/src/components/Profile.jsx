import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login"); 
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-container">
      <h1>Welcome, {user.name} 👋</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Password:</strong> {user.password}</p> 
    </div>
  );
}

export default Profile;
