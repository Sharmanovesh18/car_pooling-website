import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import DashBoard from "./components/DashBoard";
import Footer from "./components/Footer";
import ReviewPage from "./components/ReviewPage";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      {/* Fixed Navbar */}
      <Navbar />

      {/* ✅ Wrapper to prevent overlap with fixed Navbar */}
      <main style={{ paddingTop: "110px", minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </Router>
  );
}

export default App;
