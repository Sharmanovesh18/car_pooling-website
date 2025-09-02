import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import DashBoard from "./components/DashBoard";
import Footer from "./components/Footer";
import ReviewPage from "./components/ReviewPage"; // ✅ Import ReviewPage
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        // ✅ Show ONLY Loader during loading
        <Loader />
      ) : (
        // ✅ Show Navbar + Routes + Footer AFTER loading
        <Router>
          <Navbar />  {/* No need to wrap in <nav>, it's already a component */}
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/reviews" element={<ReviewPage />} /> {/* ✅ Added Review Page */}
             <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
