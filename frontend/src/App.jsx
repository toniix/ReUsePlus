import { useState } from "react";

import JoinUs from "./pages/Landing/JoinUs";
import Navbar from "./pages/Landing/Navbar";
import Footer from "./pages/Landing/Footer";
import Hero from "./pages/Landing/Hero";
import HowWorkIt from "./pages/Landing/HowWorkIt";
import SuccessStories from "./pages/Landing/SuccessStories";

import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Dashboard />
    </div>
  );
}

export default App;
