import { FaArrowRight } from "react-icons/fa";
const heroImage =
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1920&auto=format&fit=crop";

function Hero({ handleOpenRegister }) {
  // Crear un array de iconos con sus posiciones calculadas matemáticamente
  const icons = [
    { emoji: "👕", label: "Ropa" },
    { emoji: "📚", label: "Libros" },
    { emoji: "🏠", label: "Hogar" },
    { emoji: "🎁", label: "Regalos" },
    { emoji: "🍲", label: "Alimentos" },
    { emoji: "👶", label: "Niños" },
    { emoji: "💊", label: "Salud" },
    { emoji: "🎨", label: "Arte" },
  ];

  return (
    <div
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Fondo con gradiente y overlay - Ajustado z-index */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1565C0]/95 to-[#1976D2]/90" />
        <div
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{ backgroundColor: "#E3F2FD" }}
        />
      </div>

      {/* Contenido - Ajustado z-index */}
      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-32 z-[1]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Conectamos <span className="text-[#90CAF9]">donantes</span> con{" "}
              <span className="text-[#90CAF9]">personas necesitadas</span>
            </h1>

            <p className="text-[#BBDEFB] text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0">
              Únete a nuestra comunidad y sé parte del cambio. Ayuda a quienes
              más lo necesitan donando lo que ya no utilizas.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleOpenRegister}
                className="inline-flex items-center justify-center px-8 py-4 text-lg 
                         bg-[#2196F3] text-white font-semibold rounded-full
                         transform transition-all duration-300
                         hover:bg-[#1E88E5] hover:scale-105 hover:shadow-lg
                         active:scale-95"
              >
                Quiero donar
                <FaArrowRight className="ml-2 w-4 h-4" />
              </button>

              <button
                onClick={handleOpenRegister}
                className="inline-flex items-center justify-center px-8 py-4 text-lg
                         bg-white/10 text-white font-semibold rounded-full
                         backdrop-blur-sm border-2 border-white/20
                         transform transition-all duration-300
                         hover:bg-white/20 hover:scale-105 hover:shadow-lg
                         active:scale-95"
              >
                Buscar donaciones
              </button>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1,200+</div>
                <div className="text-[#90CAF9] text-sm">Donaciones</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3,000+</div>
                <div className="text-[#90CAF9] text-sm">Usuarios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-[#90CAF9] text-sm">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Elemento decorativo - Ajustado z-index */}
          <div className="hidden lg:block relative z-[2]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[450px] h-[450px]">
                {/* Círculo exterior con iconos */}
                <div className="absolute inset-0 animate-spin-slow">
                  {icons.map((icon, i) => {
                    const angle = (i * 360) / icons.length;
                    const radian = (angle * Math.PI) / 180;
                    const radius = 200; // Radio del círculo

                    // Calcular posiciones usando trigonometría
                    const x = Math.cos(radian) * radius;
                    const y = Math.sin(radian) * radius;

                    return (
                      <div
                        key={i}
                        className="absolute w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl
                                 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2
                                 hover:bg-white/20 transition-colors"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="text-white text-2xl">{icon.emoji}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Círculo medio con mensaje */}
                <div
                  className="absolute inset-12 bg-white/10 backdrop-blur-md rounded-full
                              flex items-center justify-center border border-white/20
                              animate-pulse"
                >
                  <div className="text-center p-8">
                    <div className="text-white text-5xl mb-4">🤝</div>
                    <div className="text-white/90 text-lg font-medium">
                      Unidos por
                    </div>
                    <div className="text-[#90CAF9] text-xl font-bold">
                      el cambio
                    </div>
                  </div>
                </div>

                {/* Elementos flotantes */}
                <div className="absolute inset-0">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-20 h-20 bg-gradient-to-br from-[#90CAF9]/20 to-[#42A5F5]/20
                               backdrop-blur-sm rounded-2xl animate-float"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Líneas conectoras */}
                <div
                  className="absolute inset-16 rounded-full border-2 border-dashed border-white/10
                              animate-spin-reverse-slow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Ajustado z-index */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1]">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
