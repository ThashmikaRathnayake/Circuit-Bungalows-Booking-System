"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from '../assets/locations/Diyathalawa.jpg';
import img2 from '../assets/locations/Anuradhapura.jpg';
import img3 from '../assets/locations/NuwaraEliya.jpg';
import img4 from '../assets/locations/Jaffna.jpg';
import img5 from '../assets/locations/surveyDepartment.jpg';
import img8 from '../assets/locations/Kuchchaveli.jpg';
import img9 from '../assets/locations/Pasikudah.jpg';
import img10 from '../assets/locations/Girithale.jpg';

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const locations = [
    { name: "Ampara", slug: "ampara", img: img5 },
    { name: "Diyathalawa CB", slug: "diyathalawa-cb", img: img1 },
    { name: "Diyathalawa HQ", slug: "diyathalawa-hq", img: img1 },
    { name: "Girithale", slug: "girithale", img: img10 },
    { name: "Pasikuda", slug: "pasikuda", img: img9 },
    { name: "Anuradhapura", slug: "anuradhapura", img: img2 },
    { name: "Jaffna", slug: "jaffna", img: img4 },
    { name: "Katharagama CB", slug: "katharagama-cb", img: img5 },
    { name: "Katharagama R1-R6", slug: "katharagama-r1-r6", img: img5 },
    { name: "Kuchchaveli", slug: "kuchchaveli", img: img8 },
    { name: "Nuwara Eliya", slug: "nuwaraeliya", img: img3 },
];


function ImageCarousel() {
    const [activeItem, setActiveItem] = useState(Math.floor(locations.length / 2));
    const wrapperRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        wrapperRef.current.style.setProperty("--transition", "600ms cubic-bezier(0.22, 0.61, 0.36, 1)");
        timeoutRef.current = setTimeout(() => {
            wrapperRef.current?.style.removeProperty("--transition");
        }, 900);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [activeItem]);

    return (
        <div className="w-full justify-center items-center flex flex-col bg-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="w-full max-w-7xl p-4 sm:p-6 md:p-8">
                <ul
                    ref={wrapperRef}
                    className="flex w-full flex-col gap-2 md:h-[640px] md:flex-row md:gap-[1.5%]"
                >
                    {locations.map((location, index) => (
                        <li
                            onClick={() => setActiveItem(index)}
                            aria-current={activeItem === index}
                            className={classNames(
                                "relative group cursor-pointer transition-all duration-500 ease-in-out",
                                "md:w-[8%]",
                                "md:[&[aria-current='true']]:w-[48%]",
                                "md:[transition:width_var(--transition,300ms_ease_in)]"
                            )}
                            key={location.name}
                        >
                            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-300 shadow-lg transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:z-10 transform-gpu">

                                {/* Main image */}
                                <img
                                    className={classNames(
                                        "absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-all duration-500 ease-in-out",
                                        activeItem === index ? "scale-105 grayscale-0 blur-0" : "scale-100 grayscale blur-sm"
                                    )}
                                    src={location.img}
                                    alt={location.name}
                                    width="590"
                                    height="640"
                                />

                                {/* Overlay gradient */}
                                <div
                                    className={classNames(
                                        "absolute inset-0 transition-opacity duration-500",
                                        activeItem === index ? "opacity-100" : "opacity-0",
                                        "bg-gradient-to-t from-gray-800/70 via-gray-600/40 to-transparent"
                                    )}
                                />

                                {/* Details shown when ACTIVE */}
                                {activeItem === index && (
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-center max-w-[220px] w-full">
                                        <p
                                            className="text-2xl font-bold md:text-4xl text-gray-100"
                                            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
                                        >
                                            {location.name}
                                        </p>
                                        <div className="flex gap-4 w-full">
                                            <Link to={`/booking/${location.slug}`} className="bg-gray-200 text-gray-800 flex-1 py-3 text-sm rounded-md font-semibold hover:bg-gray-300 transition shadow">
                                                View Details
                                            </Link>
                                            <Link to={`/booking/${location.slug}`} className="bg-gray-800 text-gray-100 flex-1 py-3 text-sm rounded-md font-semibold hover:bg-gray-900 transition shadow">
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {/* Vertical name when INACTIVE */}
                                {activeItem !== index && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-lg font-semibold tracking-widest ">
                                        <span className="rotate-180 [writing-mode:vertical-rl] tracking-[0.35em] drop-shadow-[0_0_2px_rgba(0,0,0,0.7)]">
                                            {location.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ImageCarousel;
