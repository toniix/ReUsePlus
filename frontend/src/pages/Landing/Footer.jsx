import { useState } from "react";
// import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <footer className="w-full bg-gradient-to-r from-[#0d47a1] via-[#1976d2] to-[#64b5f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top section with logo and newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-white/20">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              ReUse+
            </h2>
            <p className="text-[#e3f2fd] text-sm sm:text-base max-w-md">
              Creamos experiencias digitales excepcionales que transforman
              marcas y hacen crecer negocios.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
              Suscríbete a nuestro newsletter
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bbdefb] flex-grow text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 sm:px-6 sm:py-3 bg-[#bbdefb] hover:bg-[#e3f2fd] text-[#0d47a1] font-medium rounded-lg transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
              >
                Suscribir <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer sections - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 border-b border-white/20">
          {/* Nosotros Section */}
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold text-white mb-3 sm:mb-4">
              Nosotros
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to={"/nosotros"}
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors"
                >
                  Quiénes somos
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors"
                >
                  Nuestra misión
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors"
                >
                  Equipo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors"
                >
                  Historia
                </a>
              </li>
            </ul>
          </div>

          {/* Términos y Condiciones Section */}
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold text-white mb-3 sm:mb-4">
              Legal
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors"
                >
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors"
                >
                  Cookies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors"
                >
                  Aviso legal
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto Section */}
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold text-white mb-3 sm:mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm sm:text-base text-[#e3f2fd]">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="break-all">info@tuempresa.com</span>
              </li>
              <li className="flex items-center text-sm sm:text-base text-[#e3f2fd]">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                <span>+34 123 456 789</span>
              </li>
              <li className="flex items-start text-sm sm:text-base text-[#e3f2fd]">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                <span>Calle Principal 123, Ciudad</span>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm sm:text-base text-[#e3f2fd] hover:text-white transition-colors flex items-center"
                >
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span>Formulario de contacto</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 sm:mb-4">
              Síguenos
            </h3>
            <div className="flex flex-wrap gap-3 mb-4 sm:mb-6">
              <a
                href="#"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bbdefb] hover:text-[#0d47a1] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-[#e3f2fd]" />
              </a>
              <a
                href="#"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bbdefb] hover:text-[#0d47a1] transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-[#e3f2fd]" />
              </a>
              <a
                href="#"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bbdefb] hover:text-[#0d47a1] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-[#e3f2fd]" />
              </a>
              <a
                href="#"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bbdefb] hover:text-[#0d47a1] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-[#e3f2fd]" />
              </a>
            </div>
            <p className="text-[#e3f2fd] text-xs sm:text-sm">
              Mantente al día con nuestras últimas noticias y actualizaciones.
            </p>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="pt-6 sm:pt-8 text-center">
          <p className="text-white/70 text-xs sm:text-sm">
            © {new Date().getFullYear()} ReUse+. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
