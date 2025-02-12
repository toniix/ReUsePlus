import { FaTshirt, FaCouch, FaUtensils } from "react-icons/fa";

const HowWorkIt = () => {
  return (
    <section id="how" className="py-16 bg-[#E3F2FD]">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1565C0] mb-12">
          ¿Qué Puedes Donar?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaTshirt className="w-12 h-12 text-[#1976D2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#1565C0]">Ropa</h3>
            <p className="text-[#1976D2]">
              Ropa en buen estado que puede dar calor y dignidad a quien lo
              necesita.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaCouch className="w-12 h-12 text-[#1976D2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#1565C0]">
              Muebles y Electrodomésticos
            </h3>
            <p className="text-[#1976D2]">
              Artículos para el hogar que pueden ayudar a familias a
              establecerse.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md sm:col-span-2 md:col-span-1 hover:shadow-lg transition-shadow">
            <FaUtensils className="w-12 h-12 text-[#1976D2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#1565C0]">
              Alimentos
            </h3>
            <p className="text-[#1976D2]">
              Alimentos no perecederos para ayudar a combatir el hambre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorkIt;
