import React from "react";
import { Link, useParams } from "react-router-dom";
import GalleryCarousel from "../components/GalleryCarousel";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IoLocationOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { PiHouseLineLight } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineLiving } from "react-icons/md";
import { MdOutlineBathroom } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { TbToolsKitchen3 } from "react-icons/tb";
import { FiTv } from "react-icons/fi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import img1 from '../assets/locations/Diyathalawa.jpg';
import img2 from '../assets/locations/Anuradhapura.jpg';
import img3 from '../assets/locations/NuwaraEliya.jpg';
import img4 from '../assets/locations/Jaffna.jpg';
import img8 from '../assets/locations/Kuchchaveli.jpg';
import img9 from '../assets/locations/Pasikudah.jpg';
import img10 from '../assets/locations/Girithale.jpg';

// Data for all circuits
const circuitsData = {
  "anuradhapura": {
    name: "Anuradhapura",
    images: [
      img2,
      img8,
      img9
    ],
    description1: "Beachside bungalow retreat in Anuradhapura...",
    description2: "Enjoy a relaxing stay near Nilaveli Beach and Pigeon Island at our comfortable Circuit Bungalows (CB-A & CB-B) in Anuradhapura...",
    survey_charges: "Rs.600",
    land_charges: "Rs.1200",
    other_charges: "Rs.5000",
    cb_A_No:"1234567890",
    cb_B_No:"4733845328",
    welcomeDescription: "Welcome to Anuradapura Circuit Bungalow. Our well-maintained property offers a peaceful retreat near Nilaveli Beach and Pigeon Island. The bungalow is situated in a serene environment with easy access to local attractions.",
    sleeps: 5,
    circuit_bungalow_description: "Our spacious and comfortable bungalows offer a perfect retreat with sea and garden views. Each bungalow is designed to provide a comfortable stay for families or small groups, with all the amenities you need for a relaxing vacation.",
    bedRooms:2,
    Living_area:1,
    mini_kitchen:1,
    bathrooms:2,
    acAvailable: true,
     cb_A_available: true,
    cb_B_available: true,


  },
  "nuwaraeliya": {
    name: "Nuwara Eliya",
    images: [
      img3,
      img1,
      img10
    ],
    description: "Luxury resort with poolside view in Nuwara Eliya..."
  },
  "diyathalawa-cb": {
    name: "Diyathalawa CB",
    images: [
      img1,
      img4,
      img10
    ],
    description: "Luxury resort with poolside view in Diyathalawa..."
  },
  "diyathalawa-hq": {
    name: "Diyathalawa HQ",
    images: [
      img1,
      img4,
      img10
    ],
    description: "Luxury resort with poolside view in Diyathalawa..."
  },
  // add the rest of the 12 circuits here
};

export default function BookingPage() {
  const { circuit } = useParams(); // get circuit from URL
  const data = circuitsData[circuit.toLowerCase()]; // lookup data

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
        <div className="w-[1800px] max-w-full h-[600px] bg-white shadow-md rounded-2xl p-6 mx-auto mb-10 flex flex-col">
          <div>
              <h1 className="text-3xl font-semibold">{data.name}</h1>
              <div className=" flex flex-row gap-2 relative p-5">
                <IoLocationOutline className="text-3xl text-blue-600" />
                <p className="text-lg text-gray-500">{data.description2}</p>
              </div>  
              <hr className="my-4 text-gray-300" />
          </div>

          <div>
              <div className=" flex flex-row gap-2 relative p-5 items-center">
                <IoIosInformationCircleOutline className="text-2xl text-blue-600" />
                <h1 className="text-xl font-semibold">Charges</h1>
              </div>
              <div className="flex-flex-col gap-2 px-5">
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
                <FiPhone className="text-2xl text-blue-600" />
                <h1 className="text-xl font-semibold">Contact for more details</h1>
              </div>
              <div className="flex flex-row gap-20 px-5">
                 <div className="flex flex-row gap-2 items-center">
                    <p className="text-lg text-gray-500">CB-A:</p>
                    <p className="text-lg text-blue-500">{data.cb_A_No}</p>
                 </div>

                 <div className="flex flex-row gap-2 items-center">
                    <p className="text-lg text-gray-500">CB-B:</p>
                    <p className="text-lg text-blue-500">{data.cb_B_No}</p>
                 </div>
              </div>
              <button className="w-[200px] h-[50px] rounded-lg bg-blue-700 cursor-pointer mt-10 text-white hover:bg-blue-800 ">Book this bungalow</button>
          </div>

        </div>
    </div>

    <div className="flex items-center justify-center w-full">
        <div className="w-[1800px] max-w-full h-[400px] bg-white shadow-md rounded-2xl p-6 mx-auto mb-10 flex flex-col">
            <div>
              <h1 className="text-3xl font-semibold">Our Accommodations</h1>
             </div> 

             <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-full md:w-1/2">
                <img src={data.images[0]} alt={data.name} className="w-full h-[300px] object-cover rounded-xl" />
              </div>

              <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-xl font-semibold mb-5 ">Location & Overview</h2>
                <p className="text-lg text-gray-600 mb-10">{data.welcomeDescription}</p>
                <Link 
                  to=""
                  className="mt-3 text-blue-600 hover:underline flex items-center gap-1"
                >
                  <PiHouseLineLight className="text-xl" />
                  <span> Managed by the Survey Department</span>
                </Link>
              </div>


             </div>


        </div>
      </div>


    <div className="flex items-center justify-center w-full">
        <div className="w-[1800px] max-w-full h-[1000px] bg-white shadow-md rounded-2xl p-6 mx-auto mb-10 flex flex-col">

             <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-full md:w-1/2">
                <img src={data.images[0]} alt={data.name} className="w-full h-[700px] object-cover rounded-xl" />
              </div>

              <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-xl font-semibold mb-5 ">Circuit Bungalow</h2>
                <div className="mt-1 flex flex-row items-center gap-1 mb-5">
                  <IoBedOutline className="text-xl"/>
                  <p className="text-xl text-gray-600 ">sleeps {data.sleeps} people</p>
                </div>
                
                <p className="text-xl text-gray-600 mb-5">
                  {data.circuit_bungalow_description}
                </p>
                
                <div className="flex flex-col mb-5">
                  <h1 className="text-xl font-semibold">Key Features:</h1>

                  <div className="gap-2">
                    <div className="flex flex-row gap-20">
                      <div className="mt-1 flex flex-row items-center gap-2">
                      <IoBedOutline className="text-xl"/>
                      <p className="text-xl text-gray-600 ">{data.bedRooms} bedrooms</p>
                      </div>

                      <div className="mt-1 flex flex-row items-center gap-2">
                      <TbAirConditioning className="text-xl"/>
                      <p className="text-xl text-gray-600 "> {data.acAvailable ? "A/C available" : "A/C not available"}</p>
                       </div>
                    </div>
                     

                     <div className="flex flex-row gap-20">
                      <div className="mt-1 flex flex-row items-center gap-2">
                      <MdOutlineLiving className="text-xl"/>
                      <p className="text-xl text-gray-600 ">{data.Living_area} living area</p>
                    </div>

                      <div className="mt-1 flex flex-row items-center gap-2">
                      <TbToolsKitchen3 className="text-xl"/>
                      <p className="text-xl text-gray-600 "> {data.mini_kitchen} mini kitchen</p>
                       </div>
                    </div>

                    <div className="mt-1 flex flex-row items-center gap-2">
                      <MdOutlineBathroom className="text-xl"/>
                      <p className="text-xl text-gray-600 ">{data.bathrooms} bathrooms</p>
                    </div>

                  
                    
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-xl font-semibold">Amenities:</h1>

                  <div className="flex flex-row gap-20">
                    <div className="flex flex-row items-center gap-2 mt-1">
                       <TbAirConditioning  className="text-xl"/>
                       <p className="text-xl text-gray-600 ">Air Conditioning</p>
                    </div>

                    <div className="flex flex-row items-center gap-2 mt-1">
                       <MdOutlineBathroom className="text-xl"/>
                       <p className="text-xl text-gray-600 ">Private bathrooms</p>
                    </div>

                  </div>

                  <div className="flex flex-row gap-34">
                    <div className="flex flex-row items-center gap-2 mt-1">
                       <MdOutlineLocalFireDepartment className="text-xl"/>
                       <p className="text-xl text-gray-600 ">Hot water</p>
                    </div>

                    <div className="flex flex-row items-center gap-2 mt-1">
                       <FiTv className="text-xl"/>
                       <p className="text-xl text-gray-600 ">TV</p>
                    </div>

                  </div>

                   <div className="flex flex-row gap-28 mb-5">
                    <div className="flex flex-row items-center gap-2 mt-1">
                       <TbToolsKitchen3 className="text-xl"/>
                       <p className="text-xl text-gray-600 ">mini kitchen</p>
                    </div>

                    <div className="flex flex-row items-center gap-2 mt-1">
                       <FaWifi className="text-xl"/>
                       <p className="text-xl text-gray-600 ">WiFi</p>
                    </div>

                  </div>

                  <hr className="my-4 text-gray-300" />

                  <div className="mt-5 mb-5">
                    {data.cb_A_available && data.cb_B_available ? (
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-2 mb-2">
                          <FaCheck className="text-xl text-blue-500" />
                          <h1 className="text-xl text-blue-500">Circuit Bungalow A & B available</h1>
                        </div>
                      <p className="text-xl">
                        Both bungalows have identical features <br/>and amenities. You can book either one based<br/> on availability.
                      </p>
                      </div>
                    ) : (
                      <div>
                        {data.cb_A_available && <p>Bungalow A is available</p>}
                        {data.cb_B_available && <p>Bungalow B is available</p>}
                        {!data.cb_A_available && !data.cb_B_available && <p>All bungalows are currently unavailable</p>}
                      </div>
                    )}
                  </div>
                  <hr className="my-4 text-gray-300" />

                </div>

              </div>

              
             </div>
              <div className="w-full flex items-start mt-10 justify-between">
                <div className="flex flex-col max-w-xl">
                  <h1 className="text-xl font-semibold">Additional Information</h1>
                  <p className="text-lg text-gray-500">
                    Circuit Bungalows are maintained to the highest standards and offer the same level of comfort.
                  </p>
                </div>

                <button className="w-[200px] h-[50px] rounded-lg mt-10 bg-blue-700 text-white hover:bg-blue-800 cursor-pointer">
                  Check Availability
                </button>
              </div>


        </div>
      </div>



</div>
      <Footer />
    </div>
  )
}
