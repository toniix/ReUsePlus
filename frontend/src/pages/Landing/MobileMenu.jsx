import React from "react";

const MobileMenu = () => {
  return (
    <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-4`}>
      <div className="flex flex-col space-y-4">
        <a
          href="#inicio"
          className="text-gray-700 hover:text-blue-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Inicio
        </a>
        <a
          href="#how"
          className="text-gray-700 hover:text-blue-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Cómo Funciona
        </a>
        <a
          href="#stories"
          className="text-gray-700 hover:text-blue-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Historias
        </a>
        <a
          href="#contact"
          className="text-gray-700 hover:text-blue-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Contacto
        </a>
        <button
          onClick={handleOpenLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center w-full justify-center"
        >
          <FaSignInAlt className="mr-2" />
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
