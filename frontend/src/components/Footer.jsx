import React from "react";
import {
    FaFacebookF,
    FaGoogle,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import surveyLogo from "../assets/surveylogo.png";

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-gray-100 px-6 md:px-16 lg:px-24 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

                {/* Left Section */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold inline-block">
                        Survey<span className="text-gray-400"> Department</span>
                    </h3>
                    <div className="mt-4 inline-block ml-0 md:ml-[100px]">
                        <img
                            src={surveyLogo}
                            alt="Survey Logo"
                            className="h-20 w-auto"
                        />
                    </div>
                </div>

                {/* Center Section */}
                <div className="flex flex-col justify-center space-y-4 text-center md:text-left md:ml-20">
                    <div className="flex items-center justify-center md:justify-start">
                        <FaMapMarkerAlt className="mr-3 text-xl text-gray-400" />
                        <p>No 150, Bernad Soysa Road, Narahenpita, Colombo 05, Sri Lanka</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                        <FaPhone className="mr-3 text-xl text-gray-400" />
                        <p>+94 11 236 9011</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                        <FaEnvelope className="mr-3 text-xl text-gray-400" />
                        <p>sg@survey.gov.lk</p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-center md:items-end text-center md:text-right md:mr-10">
                    <p className="font-semibold mb-2 text-lg">Office Hours</p>
                    <p className="mb-4 text-sm md:text-base">
                        Monday to Friday <br /> 8:15 am – 4:30 pm
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="https://web.facebook.com/survey.gov.lk/?_rdc=1&_rdr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800 rounded-full text-white hover:bg-green-500 transition"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://www.survey.gov.lk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800 rounded-full text-white hover:bg-green-500 transition"
                        >
                            <FaGoogle />
                        </a>
                        <a
                            href="https://www.youtube.com/channel/UC8aurmZ_wN2lYoGUeZzFesQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800 rounded-full text-white hover:bg-green-500 transition"
                        >
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-10 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Survey Department Sri Lanka. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
