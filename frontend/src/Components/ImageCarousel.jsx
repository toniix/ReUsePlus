import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
  >
    <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
  >
    <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
  </button>
);

const ImageCarousel = ({
  images,
  aspectRatio = "square",
  objectFit = "cover",
  containerClassName = "",
}) => {
  if (!images || images.length === 0) {
    return (
      <div
        className={`${containerClassName} ${
          aspectRatio === "auto" ? "" : "aspect-square"
        }`}
      >
        <img
          src="/placeholder-image.jpg"
          alt="Placeholder"
          className={`w-full h-full object-${objectFit}`}
        />
      </div>
    );
  }

  // Si solo hay una imagen, renderizar directamente sin Slider
  if (images.length === 1) {
    return (
      <div
        className={`relative group ${containerClassName} ${
          aspectRatio === "auto" ? "" : "aspect-square"
        }`}
      >
        <img
          src={images[0]?.image_url || "/placeholder-image.jpg"}
          alt="Imagen"
          className={`w-full h-full object-${objectFit} rounded-t-xl`}
        />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    adaptiveHeight: false,
    className: "h-full w-full",
  };

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "h-full",
  };

  return (
    <div className={`relative group ${containerClassName}`}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${aspectRatioClasses[aspectRatio]} w-full h-full`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={image?.image_url || "/placeholder-image.jpg"}
                alt={`Imagen ${index + 1}`}
                className={`w-full h-full object-${objectFit} rounded-t-xl`}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
