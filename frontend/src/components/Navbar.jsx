import React, { useState } from "react";
import { FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import surveyLogo from "../assets/surveylogo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-500 h-24 flex items-center px-6 lg:px-12 justify-between relative">
            <div className="flex items-center">
                <img
                    src={surveyLogo}
                    alt="Survey Department Logo"
                    className="h-16 w-auto"
                />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg sm:text-xl md:text-2xl text-gray-100 font-sans text-center">
                Survey Department Sri Lanka
            </div>

            {/* desktop */}
            <ul className="hidden lg:flex space-x-6 font-serif text-lg text-gray-100 items-center">
                <li>
                    <a
                        href="#"
                        className="hover:text-gray-300 transition-colors duration-300"
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="hover:text-gray-300 transition-colors duration-300"
                    >
                        About Us
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="hover:text-gray-300 transition-colors duration-300"
                    >
                        Contact
                    </a>
                </li>
                <li>
                    <button className="flex items-center text-gray-100 hover:text-gray-300 transition">
                        <FaUserPlus className="mr-1" /> Login
                    </button>
                </li>
            </ul>

            {/* mobile + tablets */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-100 text-2xl focus:outline-none"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-24 left-0 w-full bg-gray-600 shadow-lg lg:hidden z-50">
                    <ul className="flex flex-col items-center space-y-4 py-6 text-gray-100 font-serif text-lg">
                        <li>
                            <a
                                href="#"
                                className="hover:text-gray-300 transition-colors duration-300"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-gray-300 transition-colors duration-300"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-gray-300 transition-colors duration-300"
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <button className="flex items-center text-gray-100 hover:text-gray-300 transition">
                                <FaUserPlus className="mr-1" /> Login
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
