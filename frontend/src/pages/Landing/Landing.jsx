import JoinUs from "./JoinUs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import HowWorkIt from "./HowWorkIt";
import SuccessStories from "./SuccessStories";
import Contact from "./Contact";

import { useState } from "react";

const Landing = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar setShowLoginModal={setShowLoginModal} />
      <Hero />
      <HowWorkIt />
      <SuccessStories />
      <JoinUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
