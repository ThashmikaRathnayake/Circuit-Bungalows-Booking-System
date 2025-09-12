import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryCarousel({ images }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const settingsMain = {
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    dots: false,
    infinite: true,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
  };

  const settingsThumbs = {
    asNavFor: nav1,
    ref: (slider) => setNav2(slider),
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    vertical: true,
    arrows: false,
    centerMode: false,
  };

  return (
    <div
      className={`flex gap-4 max-w-[1800px] h-[600px] relative mb-10
    ${fullscreen 
      ? "fixed inset-0 z-50 bg-black flex justify-center items-center h-screen w-full" 
      : "mx-auto mb-10"}`
  }
    >
      {/* Main Slider */}
      <div className={`relative ${fullscreen ? "w-full h-full" : "w-3/4"}`}>
        <Slider {...settingsMain}>
          {images.map((img, idx) => (
            <div key={idx} className="flex justify-center items-center h-full">
              <img
                src={img}
                alt={`Slide ${idx}`}
                className={`${
                  fullscreen
                    ? "object-contain w-full h-screen"
                    : "w-full h-[600px] object-cover rounded-xl"
                }`}
              />
            </div>
          ))}
        </Slider>

        {/* Fullscreen Toggle Button */}
        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-50"
        >
          {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* Thumbnails (hidden in fullscreen) */}
        {!fullscreen && (
          <div className="w-1/4 h-[600px] flex flex-col gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200
                  ${activeIndex === idx ? "border-blue-500" : "border-transparent"}`}
                onClick={() => nav1.slickGoTo(idx)}
              >
                <img
                  src={img}
                  alt={`Thumb ${idx}`}
                  className="w-full h-full object-cover"
                />
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
