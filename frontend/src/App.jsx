// import HomePage from "./components/HomePage.jsx";


// function App(){
//   return (
//     <div className="App">
//       <HomePage />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (3 seconds)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? <Loader /> : <HomePage />}
    </div>
  );
}

export default App;
