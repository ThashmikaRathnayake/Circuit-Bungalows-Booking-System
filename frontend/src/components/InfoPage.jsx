import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Navbar from "./Navbar";
import Footer from "./Footer";

const bungalows = [
  { name: "Diyathalawa CB", position: [6.822, 81.517], description: "A cozy bungalow in Diyathalawa." },
  { name: "Nuwara Eliya", position: [6.949, 80.789], description: "Beautiful bungalow with scenic views." },
  { name: "Jaffna", position: [9.661, 80.025], description: "Historic location near Jaffna city." },
];

const darkMarker = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const faqs = [
  { question: "Where are the bungalows located?", answer: "Our circuit bungalows are located across Sri Lanka including Diyathalawa, Nuwara Eliya, Jaffna, and more." },
  { question: "How do I book a bungalow?", answer: "Select your preferred bungalow on the map or location list, click 'Book Now', and follow the online reservation process." },
  { question: "How to contact support?", answer: "You can contact us via email at info@survey.gov.lk or call +94 11 234 5678 for assistance." },
  { question: "What facilities are available?", answer: "All bungalows provide basic amenities, including beds, clean washrooms, electricity, and scenic surroundings." },
  { question: "Can I cancel or modify my booking?", answer: "Yes, you can modify or cancel your bookings by logging into your account and managing your reservations." },
];

const InfoPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 text-center px-6 md:px-20 bg-gray-200 rounded-b-xl shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Discover & Book Survey Bungalows</h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Explore locations, find answers to your questions, and book your stay seamlessly.
        </p>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300">
              <button
                className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center hover:bg-gray-300 transition"
                onClick={() => toggleFAQ(idx)}
              >
                {faq.question}
                <span className="text-gray-600">{openIndex === idx ? "−" : "+"}</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 py-4 text-gray-700 border-t border-gray-300 transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore Locations</h2>
        <div className="h-[500px] max-w-6xl mx-auto rounded-xl overflow-hidden shadow-md border border-gray-300">
          <MapContainer center={[7.8731, 80.7718]} zoom={7} scrollWheelZoom={true} className="h-full w-full rounded-xl">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            />
            {bungalows.map((b, i) => (
              <Marker key={i} position={b.position} icon={darkMarker}>
                <Popup className="bg-gray-200 text-gray-800 rounded-lg p-4 shadow-md">
                  <h3 className="font-bold text-lg">{b.name}</h3>
                  <p className="my-2">{b.description}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md transition">View Details</button>
                    <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1 rounded-md transition">Book Now</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InfoPage;
