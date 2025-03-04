import JoinUs from "./JoinUs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import HowWorkIt from "./HowWorkIt";
import SuccessStories from "./SuccessStories";
import Contact from "./Contact";
import { useState } from "react";
import Register from "../../Components/Register";
import Login from "../../Components/Login";
import Events from "./Events";
import Donations from "./Donations";
import useScrollNavigation from "../../hooks/useScrollNavigation";

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleNavigation } = useScrollNavigation();

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

  const handleShowConfirmation = () => {
    setShowRegisterModal(false);
    setShowConfirmationModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <header>
          <Navbar
            handleOpenLogin={handleOpenLogin}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            handleNavigation={handleNavigation}
          />
        </header>
        <main>
          <Hero handleOpenRegister={handleOpenRegister} />
          <Donations
            handleOpenLogin={handleOpenLogin}
            handleOpenRegister={handleOpenRegister}
          />
          <HowWorkIt />
          <SuccessStories />
          <Events handleOpenRegister={handleOpenRegister} />
          <JoinUs handleOpenRegister={handleOpenRegister} />
          <Contact />
        </main>

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
          onSuccessfulRegistration={handleShowConfirmation}
        />
      )}
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Registro Exitoso</h2>
            <p className="text-gray-700 mb-6">
              Tu registro ha sido exitoso. Por favor, revisa tu correo
              electrónico para confirmar tu cuenta.
            </p>
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
