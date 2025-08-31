import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import DashBoard from "./components/DashBoard";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Router>
        <nav>
          <Navbar />
        </nav>
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
