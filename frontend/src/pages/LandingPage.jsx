import React from "react";
import { Link } from "react-router-dom";
import surveyLogo from "../assets/surveylogo.png";
import backgroundImage from "../assets/locations/surveyDepartment.jpg";

const Landing = () => {
  return (
    <div
      className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden bg-cover bg-center object-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center px-4">
        <div className="bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl p-8 md:p-12 max-w-3xl w-full transition-transform duration-300 hover:-translate-y-1">
          <img
            src={surveyLogo}
            alt="Survey Department Logo"
            className="w-28 mx-auto mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A3A6A] mb-3">
            Circuit Bungalow Booking System
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-4">
            Survey Department of Sri Lanka
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-6">
            Centralized booking system for Survey Department bungalows for officers, families, and guests.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              state={{ isLogin: true }}
              className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-br from-[#124C82] to-[#0D3C68] shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <i className="fas fa-sign-in-alt mr-2"></i> Login
            </Link>

            <Link
              to="/login"
              state={{ isLogin: false }}
              className="px-8 py-3 rounded-full font-semibold border-2 border-[#124C82] text-[#124C82] bg-transparent hover:bg-[#124C82]/10 shadow-md transform hover:-translate-y-1 transition duration-300"
            >
              <i className="fas fa-user-plus mr-2"></i> Register
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-0">
        <svg
          className="block w-[calc(100%+1.3px)] h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
               82.39-16.72,168.19-17.73,250.45-.39C823.78,31,
               906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,
               214.34,3V0H0V27.35A600.21,600.21,0,0,0,
               321.39,56.44Z"
            className="fill-white opacity-15"
          />
        </svg>
      </div>
    </div>
  );
};

export default Landing;
