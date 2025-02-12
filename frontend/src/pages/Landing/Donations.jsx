import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { FaHeart, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import { donations } from "../../utils/donations";

function Donations({ handleOpenRegister }) {
  return (
    <section id="donations" className="relative py-16 overflow-hidden">
      {/* Fondo con gradiente usando la nueva paleta */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1976D2] to-[#2196F3] opacity-95" />

      {/* Patrón de fondo con color más claro */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-10"
        style={{ backgroundColor: "#E3F2FD" }}
      />

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Encabezado de la sección */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Donaciones Disponibles
          </h2>
          <p className="text-lg text-[#E3F2FD] max-w-2xl mx-auto">
            Explora las donaciones disponibles en tu comunidad y sé parte del
            cambio
          </p>
        </div>

        {/* Carruseles de donaciones */}
        <div className="space-y-4">
          {[1, 2].map((row, index) => (
            <Swiper
              key={row}
              modules={[Autoplay, FreeMode]}
              spaceBetween={16}
              slidesPerView="auto"
              loop={true}
              speed={2000}
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: index === 1,
              }}
              className="donations-carousel"
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 12 },
                640: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 4.5, spaceBetween: 16 },
              }}
            >
              {[...donations, ...donations].map((donation, idx) => (
                <SwiperSlide
                  key={`${donation.id}-${idx}`}
                  className="w-[260px]"
                >
                  <div
                    className="group bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    onClick={handleOpenRegister}
                  >
                    {/* Imagen */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={donation.image}
                        alt={donation.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-[#1976D2] text-white text-xs font-medium rounded-full backdrop-blur-sm">
                          {donation.category}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-[#1565C0] mb-2 line-clamp-1">
                        {donation.title}
                      </h3>

                      {/* Metadatos */}
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center text-[#1976D2]">
                          <FaUser className="w-3 h-3 text-[#42A5F5] mr-1.5" />
                          <span className="text-xs">{donation.donor}</span>
                        </div>
                        <div className="flex items-center text-[#1976D2]">
                          <FaMapMarkerAlt className="w-3 h-3 text-[#42A5F5] mr-1.5" />
                          <span className="text-xs line-clamp-1">
                            {donation.location}
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#E3F2FD]">
                        <div className="flex items-center text-[#1976D2]">
                          <FaHeart className="w-3 h-3 mr-1" />
                          <span className="text-xs font-medium">
                            {donation.interested}
                          </span>
                        </div>
                        <button
                          onClick={handleOpenRegister}
                          className="px-2 py-1 bg-[#1976D2] text-white text-xs font-medium rounded-full 
                                   hover:bg-[#1565C0] transition-colors"
                        >
                          Me interesa
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={handleOpenRegister}
            className="inline-flex items-center px-6 py-3 bg-white text-[#1976D2] rounded-full
                     font-semibold transition-all duration-300
                     hover:bg-[#E3F2FD] hover:shadow-lg active:scale-95"
          >
            <FaHeart className="mr-2" />
            Quiero donar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Donations;
