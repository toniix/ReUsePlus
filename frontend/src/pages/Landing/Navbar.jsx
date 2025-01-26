import { FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ handleOpenLogin, setIsMenuOpen, isMenuOpen }) => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">
            ReciclAyuda
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop menu */}
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
              onClick={handleOpenLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <FaSignInAlt className="mr-2" />
              Iniciar Sesión
            </button>
          </div>
        </div>

        {/* Mobile menu */}
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
      </div>
    </nav>
  );
};

export default Navbar;
