import { useEffect } from "react";
import { Heart } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { teamMembers } from "../../utils/teamMembers";
import useScrollNavigation from "../../hooks/useScrollNavigation";

const Nosotros = () => {
  const { handleNavigation } = useScrollNavigation();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplazarse al inicio de la página
  }, []);

  return (
    <>
      <Navbar handleNavigation={handleNavigation} />
      <main className="bg-white pt-24 px-4 sm:px-6 lg:px-8 pb-24">
        {/* Encabezado */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nuestro Equipo
          </h2>
          <div className="flex justify-center mt-2">
            <Heart className="text-red-500 h-8 w-8" />
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Somos un grupo comprometido con hacer del mundo un lugar mejor a
            través de la solidaridad.
          </p>
        </div>

        {/* Objetivo del proyecto */}
        <div className="max-w-4xl mx-auto mb-20 bg-blue-50 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">
            Nuestra Misión
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            Buscamos conectar a personas generosas con causas que necesitan
            apoyo, facilitando el proceso de donación y asegurando que cada
            contribución genere un impacto real y positivo en la sociedad.
          </p>
          <p className="text-lg text-gray-700">
            Creemos en la transparencia, la eficiencia y el poder de la
            comunidad para transformar realidades. Cada donación, sin importar
            su tamaño, tiene el potencial de cambiar vidas.
          </p>
        </div>

        {/* Miembros del equipo */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="mb-4">
                  <img
                    className="h-40 w-40 rounded-full object-cover shadow-lg"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-indigo-600 mb-2">
                    {member.role}
                  </p>
                  <p className="text-base text-gray-500">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Llamado a la acción */}
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Únete a nuestra causa!
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Tu apoyo es fundamental para que podamos seguir ayudando a quienes
            más lo necesitan.
          </p>
          <button
            // onClick={handleClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Hacer una donación
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Nosotros;
