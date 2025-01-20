import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLoginModal }) => {
  return (
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
            {/* <button
              // onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <FaSignInAlt className="mr-2" />
              Iniciar Sesión
            </button> */}
            <Link to="/dashboard">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center">
                <span className="mr-2">Iniciar Sesión</span>
                <FaSignInAlt className="mr-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
