import { FaHeart, FaHandHoldingHeart, FaUsers } from "react-icons/fa";

const JoinUs = ({ handleOpenRegister }) => {
  return (
    <section className="py-16 bg-[#1976D2]">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Únete a Nuestra Comunidad
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow">
            <FaHeart className="w-12 h-12 text-[#1976D2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-[#1565C0]">
              Donantes
            </h3>
            <p className="text-[#1976D2] mb-4">
              Da nueva vida a tus objetos y ayuda a quien lo necesita.
            </p>
            <button
              onClick={handleOpenRegister}
              className="bg-[#1976D2] text-white px-6 py-2 rounded-full hover:bg-[#1565C0] transition"
            >
              Donar Ahora
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <FaHandHoldingHeart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Receptores</h3>
            <p className="text-gray-600 mb-4">
              Encuentra los recursos que necesitas para mejorar tu calidad de
              vida.
            </p>
            <button
              onClick={handleOpenRegister}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Solicitar Ayuda
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg sm:col-span-2 md:col-span-1">
            <FaUsers className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Voluntarios</h3>
            <p className="text-gray-600 mb-4">
              Ayuda a conectar donaciones con quienes más las necesitan.
            </p>
            <button
              onClick={handleOpenRegister}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Ser Voluntario
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
