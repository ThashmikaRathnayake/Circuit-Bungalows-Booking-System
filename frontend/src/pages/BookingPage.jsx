import React, { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import GalleryCarousel from "../components/GalleryCarousel";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HashLink, } from "react-router-hash-link";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { Accordion, AccordionItem } from "../components/Accordion";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import axios from "axios";

export default function BookingPage() {
  const { circuit } = useParams(); 
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [showCalendar, setShowCalendar] = useState(false);


  useEffect(() => {
    const fetchBungalow = async () => {
      try {
        // Call your backend to get bungalow by name (or slug)
        const res = await axios.get(`http://localhost:3000/locationUpdate/getAll`);
        // Find the bungalow that matches the URL param (circuit)
        const bungalow = res.data.find(
          (b) => b.name.toLowerCase().replace(/\s/g, '') === circuit.toLowerCase().replace(/\s/g, '')
        );
        setData(bungalow);
      } catch (err) {
        console.error("Error fetching bungalow:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBungalow();
  }, [circuit]);

  if (loading) {
    return <div className="text-center mt-16">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold">Circuit not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full text-center py-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-snug">
            {data.name} - Circuit Bungalow Reservation
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {data.description1}
          </p>
        </div>
        <GalleryCarousel images={data.images} />

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-full">
            {/* Location Overview */}
            <div className="w-[1800px] max-w-full bg-white shadow-md rounded-2xl p-6 mx-auto mb-10 flex flex-col">
              <div>
                <h1 className="text-3xl font-semibold">{data.name}</h1>
                <div className=" flex flex-row gap-2 relative p-5">
                  <div className=" cursor-pointer">
                    <HashLink
                      smooth
                      to="/infoPage#map"
                      className="cursor-pointer text-blue-600 hover:text-gray-300 transition-colors duration-300"
                    >
                      <IoLocationOutline className="text-3xl" />
                    </HashLink>
                  </div>
                  <p className="text-lg text-gray-500">{data.description2}</p>
                </div>
                <hr className="my-4 text-gray-300" />
              </div>

              {/* Features and Amenities */}
              <div className="flex flex-col md:flex-row gap-10 mb-5 mt-5 w-full items-stretch">
                <div className="flex-1">
                  <Accordion className="h-full w-full">
                    <AccordionItem title="Key Features">
                      <p>Bedrooms: {data.bedRooms}</p>
                      <p>Living Area: {data.Living_area}</p>
                      <p>Bathrooms: {data.bathrooms}</p>
                      <p>Sleeps: {data.sleeps} people</p>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="flex-1">
                  <Accordion className="h-full w-full">
                    <AccordionItem title="Amenities">
                      <p>TV: Available</p>
                      <p>AC: {data.acAvailable ? "Available" : "Not Available"}</p>
                      <p>Mini Kitchen: {data.mini_kitchen}</p>
                      <p>Hot Water: Available</p>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <hr className="my-4 text-gray-300" />
              {/* Contacts */}
              <div>
                <div className=" flex flex-row gap-2 relative p-5 items-center">
                  <IoIosInformationCircleOutline className="text-2xl text-gray-800" />
                  <h1 className="text-xl font-semibold">Charges</h1>
                </div>
                <div className="flex flex-col gap-2 px-5">
                  <div className="flex justify-between">
                    <p className="text-lg text-gray-500">Survey Department</p>
                    <p className="">{data.survey_charges}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg text-gray-500">Land Ministry</p>
                    <p className="">{data.land_charges}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg text-gray-500">Other</p>
                    <p className="">{data.other_charges}</p>
                  </div>
                </div>

                <hr className="my-4 text-gray-300" />
              </div>

              <div>
                <div className=" flex flex-row gap-2 relative p-5 items-center">
                  <FiPhone className="text-2xl text-gray-800" />
                  <h1 className="text-xl font-semibold">Contact for more details</h1>
                </div>
                <div className="flex flex-row gap-20 px-5">
                  {data.cb_A_No && data.cb_B_No ? (
                    <>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-lg text-black">CB-A:</p>
                        <p className="text-lg text-gray-500">{data.cb_A_No}</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-lg text-black">CB-B:</p>
                        <p className="text-lg text-gray-500">{data.cb_B_No}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row gap-2 items-center">
                      <p className="text-lg text-black">Contact:</p>
                      <p className="text-lg text-gray-500">{data.cb_No}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-10">
                  <button 
                    className="w-[200px] h-[50px] rounded-lg bg-gray-700 cursor-pointer mt-10 text-white hover:bg-gray-500 " 
                    onClick={()=>{navigate("/bookingForm",{ state: { bungalow: data.name } })}}>
                      Book this bungalow
                  </button>
                  <button 
                    className="w-[200px] h-[50px] rounded-lg mt-10 bg-gray-700 text-white hover:bg-gray-500 cursor-pointer"
                    onClick={() => setShowCalendar(true)}>
                      Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCalendar && (
        <AvailabilityCalendar
          bungalowName={data.name} // Make sure this matches exactly with the booking form
          onClose={() => setShowCalendar(false)}
        />
      )}
      <Footer />
    </div>
  )
}
