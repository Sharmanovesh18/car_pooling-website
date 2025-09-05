import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import DashBoard from "./components/DashBoard";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "./components/ErrorFallback";
import Footer from "./components/Footer";
import ReviewPage from "./components/ReviewPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Location from "./components/MapPage";
import ChatSupport from "./components/Chatbot"; // Import ChatSupport component
import CtaStyles from "./components/Download"; // Import CTA styles
import DiscountCTA from "./components/Animation";

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
            <Route path="/dashboard" element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <DashBoard />
              </ErrorBoundary>
            } />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </main>
      {/* Chat Support always at bottom right */}
      <ChatSupport />

      {/* <CtaStyles /> */}
      {/* Footer always at bottom */}
      <DiscountCTA />
      <Footer />
    </Router>
  );
}

export default App;
