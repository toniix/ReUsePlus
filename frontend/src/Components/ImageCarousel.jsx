import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-48 group">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-t-xl"
      />

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Image counter and dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToImage(index, e)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
