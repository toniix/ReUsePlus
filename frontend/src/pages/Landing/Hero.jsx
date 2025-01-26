const Hero = () => {
  return (
    <section
      id="inicio"
      className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-r from-blue-500 to-blue-600"
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6">
          Conectamos Donaciones con Quienes las Necesitan
        </h1>
        <p className="text-lg sm:text-xl text-white mb-8">
          Una plataforma que une donantes, receptores y voluntarios para dar
          nueva vida a recursos reutilizables.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
  );
};

export default Hero;
