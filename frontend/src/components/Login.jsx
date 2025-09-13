import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import surveyLogo from "../assets/surveylogo.png";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [containerHeight, setContainerHeight] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const loginFormRef = useRef(null);
    const signupFormRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const formRef = isLogin ? loginFormRef : signupFormRef;
        if (formRef.current) {
            setContainerHeight(formRef.current.offsetHeight);
        }
    }, [isLogin]);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/users/register", {
                name,
                email,
                password,
                confirmPassword,
            });
            alert("User registered successfully!");
            console.log(res.data);
            setIsLogin(true); // switch to login form
        } catch (err) {
            console.error(err);
            alert("Registration failed. Check console for details.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/users/login", {
                email,
                password,
            });
            console.log(res.data);

            // Save token and user role in localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userRole", res.data.user.role);

            // Navigate based on role
            if (res.data.user.role === "admin") {
                navigate("/admin"); // admin dashboard
            } else {
                navigate("/"); // normal user homepage
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("Login failed. Please try again.");
            }
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="w-[430px] bg-white p-8 rounded-2xl shadow-2xl border border-gray-300">

                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <img src={surveyLogo} alt="Survey Department Logo" className="h-16 mb-2" />
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center">
                        Survey Department of Sri Lanka
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base mt-2">
                        Circuit Bungalow Booking System
                    </p>
                </div>

                {/* Toggle Buttons */}
                <div className="relative flex border-b border-gray-300 overflow-hidden mb-6 rounded-tl-lg rounded-tr-lg">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`w-1/2 text-lg font-semibold py-2 transition-all z-10 ${
                            isLogin ? "text-white" : "text-gray-600"
                        }`}
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`w-1/2 text-lg font-semibold py-2 transition-all z-10 ${
                            !isLogin ? "text-white" : "text-gray-600"
                        }`}
                    >
                        Sign Up
                    </button>
                    <div
                        className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-gray-600 to-gray-800 
                        rounded-tl-lg rounded-tr-lg transform transition-transform duration-300 ease-in-out
                        ${isLogin ? "translate-x-0" : "translate-x-full"}`}
                    ></div>
                </div>

                {/* Form Container with dynamic height */}
                <div
                    className="relative transition-all duration-500 ease-in-out"
                    style={{ height: containerHeight }}
                >
                    {/* Login Form */}
                    <form
                        ref={loginFormRef}
                        onSubmit={handleLogin}
                        className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                            isLogin
                                ? "opacity-100 translate-x-0 z-10"
                                : "opacity-0 -translate-x-10 z-0"
                        }`}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-gray-600 placeholder-gray-400 mb-4"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-gray-600 placeholder-gray-400 mb-4"
                            required
                        />
                        <div className="text-right text-xs cursor-pointer text-gray-700 mb-4">
                            Forgot your password?
                        </div>
                        <button className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg font-bold text-lg hover:brightness-90 transition-all">
                            Log In
                        </button>
                    </form>

                    {/* Sign Up Form */}
                    <form
                        ref={signupFormRef}
                        onSubmit={handleSignup}
                        className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                            !isLogin
                                ? "opacity-100 translate-x-0 z-10"
                                : "opacity-0 translate-x-10 z-0"
                        }`}
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-gray-600 placeholder-gray-400 mb-4"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-gray-600 placeholder-gray-400 mb-4"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-gray-600 placeholder-gray-400 mb-4"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-gray-600 placeholder-gray-400 mb-4"
                            required
                        />
                        <button className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg font-bold text-lg hover:brightness-90 transition-all">
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Switch Form Text */}
                <p className="text-center text-gray-600 mt-4">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <a
                        href="#"
                        className="relative inline-block text-gray-800 font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "Sign Up" : "Log In"}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
