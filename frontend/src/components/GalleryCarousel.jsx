import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryCarousel({ images }) {
  const [nav1, setNav1] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Main slider settings
  const settingsMain = {
    ref: (slider) => setNav1(slider),
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    dots: false,
    infinite: true,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
  };

  return (
    <div className={`flex gap-4 mx-auto relative mb-10 ${fullscreen ? "fixed inset-0 z-50 bg-black p-4 items-center justify-center" : "max-w-[1800px] h-[600px]"}`}>
      {/* Main Slider */}
      <div className={`w-3/4 relative ${fullscreen ? "h-full" : "h-[600px]"}`}>
        <Slider {...settingsMain}>
          {images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`Slide ${idx}`}
                className={`w-full ${fullscreen ? "h-screen" : "h-[600px]"} object-cover rounded-xl`}
              />
            </div>
          ))}
        </Slider>

        {/* Fullscreen Button */}
        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-50"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {/* Thumbnails */}
      {!fullscreen && (
        <div className="w-1/4 flex flex-col h-[600px] gap-2 overflow-y-auto">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200
            ${activeIndex === idx ? "border-blue-500" : "border-transparent"}`}
              onClick={() => nav1.slickGoTo(idx)}
            >
              <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Custom Arrow Components */
const SamplePrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1"
  >
    <ChevronLeft size={20} />
  </button>
);

const SampleNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1"
  >
    <ChevronRight size={20} />
  </button>
);
