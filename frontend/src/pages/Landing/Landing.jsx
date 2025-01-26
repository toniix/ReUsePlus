import JoinUs from "./JoinUs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import HowWorkIt from "./HowWorkIt";
import SuccessStories from "./SuccessStories";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import { useState } from "react";
import Register from "../../Components/Register";
import Login from "../../Components/Login";

const Landing = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
    setIsMenuOpen(false);
  };

  const handleOpenRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      {" "}
      <div className="min-h-screen bg-white">
        <Navbar
          handleOpenLogin={handleOpenLogin}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
        <Hero />
        <HowWorkIt />
        <SuccessStories />
        <JoinUs handleOpenRegister={handleOpenRegister} />
        <Contact />
        <Footer />
      </div>
      {/* Login Modal */}
      {showLoginModal && (
        <Login
          setShowLoginModal={setShowLoginModal}
          handleOpenRegister={handleOpenRegister}
        />
      )}
      {/* Register Modal */}
      {showRegisterModal && (
        <Register
          setShowRegisterModal={setShowRegisterModal}
          handleOpenLogin={handleOpenLogin}
        />
      )}
    </>
  );
};

export default Landing;
