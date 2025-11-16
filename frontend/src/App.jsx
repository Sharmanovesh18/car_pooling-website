import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import DashBoard from "./components/DashBoard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import Footer from "./components/Footer";
import ReviewPage from "./components/ReviewPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Location from "./components/MapPage";
import ChatSupport from "./components/Chatbot";
import CtaStyles from "./components/Download";
import DiscountCTA from "./components/Animation";
import Driver from "./components/Driver";

// ✅ Layout wrapper
function Layout({ children }) {
  const location = useLocation();

  // Pages where Footer & CTA should be hidden
  const hideFooterAndCTA = ["/login", "/register", "/reviews", "/location"];

  const shouldHide = hideFooterAndCTA.includes(location.pathname);

  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />

      {/* ✅ Wrapper to prevent overlap with fixed Navbar */}
      <main style={{ paddingTop: "110px", minHeight: "80vh" }}>{children}</main>

      {/* Chat Support always visible */}
      <ChatSupport />

      {/* Footer + CTA only on allowed pages */}
      {!shouldHide && (
        <>
          <DiscountCTA />
          <Footer />
        </>
      )}
    </>
  );
}

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
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <DashBoard />
              </ErrorBoundary>
            }
          />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/location" element={<Location />} />
          <Route path="/driver" element={<Driver />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
