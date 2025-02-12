import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { successStories } from "../../assets/stories";

const SuccessStories = () => {
  return (
    <section id="stories" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#1565C0] mb-12">
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
              <div className="bg-[#E3F2FD] rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="h-48 w-full object-cover md:h-full"
                    />
                  </div>
                  <div className="p-8 md:w-1/2">
                    <h3 className="text-xl font-bold text-[#1565C0] mb-4">
                      {story.title}
                    </h3>
                    <p className="text-[#1976D2]">{story.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
