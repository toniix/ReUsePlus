import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import { supabaseClient } from "../../supabase/client";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({ email });
      if (error) throw error;
      console.log("Check your email for the login link!");
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">ReciclAyuda</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600">
                Inicio
              </a>
              <a href="#how" className="text-gray-700 hover:text-blue-600">
                Cómo Funciona
              </a>
              <a href="#stories" className="text-gray-700 hover:text-blue-600">
                Historias
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">
                Contacto
              </a>
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <FaSignInAlt className="mr-2" />
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* <Link to="/dashboard"> */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Ingresar
              </button>
              {/* </Link> */}
            </form>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
