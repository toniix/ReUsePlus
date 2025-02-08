import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { donations } from "../../utils/donations";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaUser,
  FaHeartbeat,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Donations = ({ handleOpenLogin, handleOpenRegister }) => {
  return (
    <section
      id="donations"
      className="py-8 bg-gradient-to-b from-blue-600 to-blue-500"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Donaciones Disponibles
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Desliza para explorar las donaciones disponibles en tu comunidad
          </p>
        </div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          freeMode={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="donations-carousel"
        >
          {[...donations, ...donations].map((donation, index) => (
            <SwiperSlide
              key={`${donation.id}-${index}`}
              className="w-[300px] sm:w-[350px]"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {donation.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                    {donation.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {donation.description}
                  </p>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-gray-700">
                      <FaUser className="w-3 h-3 text-blue-600 mr-2" />
                      <span className="text-xs">{donation.donor}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaMapMarkerAlt className="w-3 h-3 text-blue-600 mr-2" />
                      <span className="text-xs">{donation.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaCalendarAlt className="w-3 h-3 text-blue-600 mr-2" />
                      <span className="text-xs">{donation.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-600">
                      <FaHeart className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">
                        {donation.interested}
                      </span>
                    </div>
                    <button
                      onClick={handleOpenRegister}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                    >
                      Me interesa
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8">
          <button
            onClick={handleOpenRegister}
            className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition duration-300 inline-flex items-center font-semibold"
          >
            <FaHeart className="mr-2" />
            Quiero donar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Donations;
