import { useState } from 'react';
import { FaHeart, FaHandHoldingHeart, FaUsers, FaSignInAlt, FaTshirt, FaCouch, FaUtensils } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const successStories = [
    {
      title: "Muebles para un Nuevo Hogar",
      description: "María donó sus muebles a una familia que comenzaba de nuevo, impactando directamente en su calidad de vida.",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500"
    },
    {
      title: "Ropa para el Invierno",
      description: "Un grupo de voluntarios recolectó más de 200 abrigos para personas sin hogar durante el invierno.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500"
    },
    {
      title: "Electrodomésticos Reutilizados",
      description: "Juan donó electrodomésticos en buen estado que ayudaron a equipar 3 hogares necesitados.",
      image: "https://images.unsplash.com/photo-1583241475880-083f84372725?ixlib=rb-1.2.1&auto=format&fit=crop&w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">ReciclAyuda</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600">Inicio</a>
              <a href="#how" className="text-gray-700 hover:text-blue-600">Cómo Funciona</a>
              <a href="#stories" className="text-gray-700 hover:text-blue-600">Historias</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contacto</a>
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

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Conectamos Donaciones con Quienes las Necesitan
          </h1>
          <p className="text-xl text-white mb-8">
            Una plataforma que une donantes, receptores y voluntarios para dar nueva vida a recursos reutilizables.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="#register"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300"
            >
              Quiero Donar
            </a>
            <a
              href="#register"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Quiero ser Voluntario
            </a>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ¿Qué Puedes Donar?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <FaTshirt className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ropa</h3>
              <p className="text-gray-600">
                Ropa en buen estado que puede dar calor y dignidad a quien lo necesita.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <FaCouch className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Muebles y Electrodomésticos</h3>
              <p className="text-gray-600">
                Artículos para el hogar que pueden ayudar a familias a establecerse.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <FaUtensils className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alimentos</h3>
              <p className="text-gray-600">
                Alimentos no perecederos para ayudar a combatir el hambre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Historias de Impacto
          </h2>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="max-w-4xl mx-auto"
          >
            {successStories.map((story, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="h-48 w-full object-cover md:h-full"
                      />
                    </div>
                    <div className="p-8 md:w-1/2">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{story.title}</h3>
                      <p className="text-gray-600">{story.description}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Únete a Nuestra Comunidad
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <FaHeart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Donantes</h3>
              <p className="text-gray-600 mb-4">
                Da nueva vida a tus objetos y ayuda a quien lo necesita.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Donar Ahora
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <FaHandHoldingHeart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Receptores</h3>
              <p className="text-gray-600 mb-4">
                Encuentra los recursos que necesitas para mejorar tu calidad de vida.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Solicitar Ayuda
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <FaUsers className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Voluntarios</h3>
              <p className="text-gray-600 mb-4">
                Ayuda a conectar donaciones con quienes más las necesitan.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Ser Voluntario
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ¿Necesitas Ayuda?
          </h2>
          <div className="max-w-lg mx-auto">
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Mensaje"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 ReciclAyuda. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Ingresar
              </button>
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
    </div>
  );
}

export default App;