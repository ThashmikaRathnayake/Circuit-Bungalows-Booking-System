import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
// import img1 from '../assets/locations/Diyathalawa.jpg';
// import img2 from '../assets/locations/Anuradhapura.jpg';
// import img3 from '../assets/locations/NuwaraEliya.jpg';
// import img4 from '../assets/locations/Jaffna.jpg';
// import img8 from '../assets/locations/Kuchchaveli.jpg';
// import img9 from '../assets/locations/Pasikudah.jpg';
// import img10 from '../assets/locations/Girithale.jpg';

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
    <div className="flex gap-4 max-w-[1800px] h-[600px] mx-auto relative mb-10">
      {/* Main Slider */}
      <div className={`w-3/4 relative ${fullscreen ? "fixed inset-0 z-50 bg-black p-10" : ""}`}>
        <Slider {...settingsMain}>
          {images.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt={`Slide ${idx}`} className="w-full h-[600px] object-cover rounded-xl" />
            </div>
          ))}
        </Slider>
        {/* Fullscreen Button */}
        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="w-1/4 flex items-center">
        <Slider {...settingsThumbs}>
          {images.map((img, idx) => (
            <div key={idx} className="px-1">
              <img src={img} alt={`Thumb ${idx}`} className={`h-[180px] w-full object-cover rounded-lg cursor-pointer transition-all duration-200 
                ${activeIndex === idx ? "ring-4 ring-blue-500" : ""}`}
              />
            </div>
          ))}
        </Slider>
      </div>
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
