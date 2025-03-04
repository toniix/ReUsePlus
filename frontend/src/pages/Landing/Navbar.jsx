import { FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({
  handleOpenLogin,
  setIsMenuOpen,
  isMenuOpen,
  handleNavigation,
}) => {
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full z-10 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
            className="text-xl sm:text-2xl font-bold text-[#1565C0] hover:text-[#1976D2] transition-colors duration-300"
          >
            ReUse+
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[#1976D2] transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1976D2]/20"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {["inicio", "how", "stories", "events", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:text-[#1976D2] hover:bg-blue-50 transition-all duration-300 relative group"
              >
                <span>
                  {item === "inicio"
                    ? "Inicio"
                    : item === "how"
                    ? "Cómo Funciona"
                    : item === "stories"
                    ? "Historias"
                    : item === "events"
                    ? "Eventos"
                    : "Contacto"}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1976D2] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <button
              onClick={handleOpenLogin}
              className="ml-4 bg-[#1976D2] text-white px-6 py-2 rounded-lg hover:bg-[#1565C0] transition-all duration-300 transform hover:scale-105 hover:shadow-md flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#1976D2]/50"
            >
              <FaSignInAlt />
              <span>Iniciar Sesión</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 mt-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-2 pb-4">
            {["inicio", "how", "stories", "events", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  handleNavigation(item);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:text-[#1976D2] hover:bg-blue-50 rounded-lg transition-all duration-300"
              >
                {item === "inicio"
                  ? "Inicio"
                  : item === "how"
                  ? "Cómo Funciona"
                  : item === "stories"
                  ? "Historias"
                  : item === "events"
                  ? "Eventos"
                  : "Contacto"}
              </button>
            ))}
            <button
              onClick={handleOpenLogin}
              className="w-full mt-2 bg-[#1976D2] text-white px-4 py-2 rounded-lg hover:bg-[#1565C0] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaSignInAlt />
              <span>Iniciar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
