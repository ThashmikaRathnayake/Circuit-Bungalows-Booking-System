import React, { useState, useEffect } from "react";
import { FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import surveyLogo from "../assets/surveylogo.png";
import { Link } from "react-router-dom"; import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { FaSignOutAlt } from 'react-icons/fa';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        setIsLoggedIn(!!token);
        setUserRole(role);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav className="bg-gray-500 h-24 flex items-center px-6 lg:px-12 justify-between relative">
            <div className="flex items-center">
                <img
                    src={surveyLogo}
                    alt="Survey Department Logo"
                    className="h-16 w-auto"
                />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg sm:text-xl md:text-2xl text-gray-100 font-sans text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Survey Department Sri Lanka
            </div>

            {/* desktop */}
            <ul className="hidden lg:flex space-x-6 text-lg text-gray-100 items-center">
                {userRole === "admin" ? (
                    <>
                        <li>
                            <Link to="/admin" className="hover:text-gray-300 transition-colors duration-300">
                                Requests
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin" className="hover:text-gray-300 transition-colors duration-300">
                                Update
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <HashLink smooth to="/" className="hover:text-gray-300 transition-colors duration-300">
                                Home
                            </HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/infoPage#map" className="hover:text-gray-300 transition-colors duration-300">
                                Map
                            </HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/infoPage#faq" className="hover:text-gray-300 transition-colors duration-300">
                                FAQ
                            </HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/infoPage#rules" className="hover:text-gray-300 transition-colors duration-300">
                                Rules
                            </HashLink>
                        </li>
                    </>
                )}

                <li>
                    {isLoggedIn ? (
                        <button className="flex items-center text-gray-100 hover:text-gray-300 transition" onClick={handleLogout}>
                            <FaSignOutAlt className="mr-1" /> Logout
                        </button>
                    ) : (
                        <button onClick={() => navigate("/login")} className="flex items-center text-gray-100 hover:text-gray-300 transition">
                            <FaUserPlus className="mr-1" /> Login
                        </button>
                    )}
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
                        {userRole === "admin" ? (
                            <>
                                <li>
                                    <Link to="/admin" className="hover:text-gray-300 transition-colors duration-300">
                                        Requests
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin" className="hover:text-gray-300 transition-colors duration-300">
                                        Update
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <HashLink smooth to="/" className="hover:text-gray-300 transition-colors duration-300">
                                        Home
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink smooth to="/infoPage#map" className="hover:text-gray-300 transition-colors duration-300">
                                        Map
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink smooth to="/infoPage#faq" className="hover:text-gray-300 transition-colors duration-300">
                                        FAQ
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink smooth to="/infoPage#rules" className="hover:text-gray-300 transition-colors duration-300">
                                        Rules
                                    </HashLink>
                                </li>
                            </>
                        )}

                        <li>
                            {isLoggedIn ? (
                                <button className="flex items-center text-gray-100 hover:text-gray-300 transition" onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                <button onClick={() => navigate("/login")} className="flex items-center text-gray-100 hover:text-gray-300 transition">
                                    Login
                                </button>
                            )}
                        </li>
                    </ul>

                </div>
            )}
        </nav>
    );
};

export default Navbar;
