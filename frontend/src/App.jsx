import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";  
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />      
          <HomePage />    
        </>
      )}
    </div>
  );
}

export default App;
