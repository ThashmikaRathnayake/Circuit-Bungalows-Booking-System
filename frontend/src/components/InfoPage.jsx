import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

const rules = {
  en: [
    "The applicant mentioned in the application form must be present when staying. No one other than the people mentioned in the form can stay.",
    "The applicant is responsible for confirming the identity of the guests and will be fully responsible for them during the stay.",
    "The names and National Identity Card (NIC) numbers of all guests must be provided, and the applicant must ensure they are correct.",
    "All guests must follow any orders given by security or health authorities when needed.",
    "If any property damage happens during the stay, the applicant must pay the cost decided by the Surveyor General.",
    "One day of stay means from 10:00 a.m. on one day until 9:00 a.m. the next day.",
    "The applicant must pay for the water and electricity used during the stay. Therefore, the applicant should check the meter readings at the start and end to confirm the correct usage.",
    "The applicant must also pay for bed linen used (bedsheets, pillow covers, blankets, towels) according to the official circular rates.",
    "Simply applying does not guarantee a reservation. A reservation is confirmed only after payment is made and the official reservation letter is issued.",
    "The applicant must collect the reservation letter in time and inform the caretaker in advance. If payment is not made at least one week before the planned date, the reservation may be given to another applicant without notice.",
    "Except for cancellations due to official reasons, no refund or date change will be given if the applicant cancels or fails to go on the trip.",
    "The Surveyor General can cancel any reservation at any time if required for official needs.",
    "If several applications are received for the same day, priority will be given based on seniority and importance. If applicants are of the same level, the date of application will be considered.",
    "Guests must arrive at the bungalow/holiday home before 6:00 p.m. on the reserved date.",
    "Do not bring more people than the maximum allowed. If this rule is broken, the reservation will be cancelled, and the applicant will not be allowed to reserve again in the future."
  ],
  si: [
    "සංචාරක බංගලාවල / නිවාඩු නිකේතනවල නවාතැන් ගැනීමට ඉදිරිපත් කරන ඉල්ලුම්පත්‍රයේ සදහන් ඉල්ලුම්කරු අනිවාර්යෙන්ම යා යුතු අතර ඉල්ලුම්පත්රයේ සදහන් අයට පරිබාහිරව කිසිවෙක් නවාතැන් ගත නොයුතුය. ",
    "නවාතැන් ගන්නා අයගේ අනන්‍යතාවය පිළිබදව ඉල්ලුම්කරු සැහීමකට පත් විය යුතු අතර නවාතැන් ගන්න කාල වකවානුව තුලදී ඒ සම්බන්දයෙන් වන සියලුම වගකීම ඉල්ලුම්කරු විසින් දැරිය යුතුය.",
    "නවාතැන් ගන්නා අයගේ නම සහ ජාතික හැදුනුම්පත් අංකය ලබා දීම අනිවාර්ය වන අතර ඒවායේ නිවරදිබවය පිළිබද ඉල්ලුම්කරු වග කිය යුතු වේ.",
    "ආරක්ෂක / සෞඛ්‍ය අවශ්‍යතාවයන් මත ඒ ඒ අවස්ථාවලදී ආරක්ෂක අංශය හෝ සෞඛ්‍ය අංශය විසින් පණවන නියෝගයන්ට සියලුම නවාතන්කරුවන් අවනත විය යුතුය.",
    "නවාතන් ගැනීමේ කාලය තුළදී එහි දේපල වලට යම් හානියක් වුවහොත් සර්වයර්  ජෙනරාල් විසින් නියම කරන ලබන අලාභය ගෙවීමට ඉල්ලුම්කරු බැඳී සිටියි.",
    "නවාතැන් ගන්නා එක් දිනයක් යනු පෙරවරු  10.00 සිට පසුදා  පෙරවරු 9.00 දක්වා කාලය වේ. ",
    "නවාතැන් ගන්නා කාලය තුළ පරිහරණය කරලා ලද ජලය, විදුලිය  සදහා  ගාස්තු බංගලා භාරකරු වෙත  ඉල්ලුම්කරු විසින් ගෙවිය යුතු බැවින් එසේ භාවිතා කරන ප්‍රමාණයන්ට අදාළ ආරම්භයේ හා අවසානයේ මනුකියවීම් වල නිරවධ්‍යතාවය තහරුව කර ගැනීම සඳහා ඉල්ලුම්කරු විසින්ද පරීක්ෂා කිරීම උචිත වේ.",
    "නවත්වාන් ගන්නා අය විසින් පාවිච්චි කරනු ලබන  රෙදිපිලි  සඳහා ගාස්තුව බංගලා භාරකරු වෙත ඉල්ලුම්කරු විසින් ගෙවිය යුතු අතර ඒ සඳහා නිකුත් කර ඇති වළංගු චක්‍ර ලේකයේ සඳහන් රෙදිපිළි  සඳහා (ඇඳ ඇතිරිලි, කොට්ට උර, බ්ලන්ඩ්කට්, අත්පිස්නා) අය කරන ගාස්තු එයට අදාල වේ.",
    "නවාතැන් ගැනීමට ඉල්ලුම් කිරීමෙන් පමණක් නිවාසය වෙන් කිරිදීමට දෙපාර්තමේන්තුව බැඳී නොසිටන අතර මුදල් ගෙවා වෙන් කිරීමේ ලිපිය  අදාළ සංචාරක බංගලාව / නිවාඩු නිකේතනය වෙත නිකුත් කිරීමෙන්ම පසු පමණක් වෙන් කිරීම  සනාත වේ.  ",
    "විදිමත් වෙන් කිරීම අදාල නිවස භාරකරු වෙතේ කල්වේලා  ඇතිව දැනුම් දීමට හැකිවන සේ පෙර (9) හි සඳහන් පරිදි වෙන් කිරීමේ ලිපි ලබා ගැනීම ඉල්ලුම්කරුගේ  වගකීම වේ. එබැවින් ගමනේ යෙදෙන දිනට සතියකට ප්‍රථම මුදල්  ගෙවා නොමැති නම් දැනුම් දීමකින් තොරව වෙනත් ඉල්ලා ඇති අයකු වෙත  වෙන් කර දීම සිදු කරනු ඇත.",
    "ආයතනික හේතු මත අවලංගු  කිරීමකදී හැර වෙනත් කිසිම අවස්ථාවක ගමනේ  නොයෙදීම නිසා වෙන් කිරීමේ ගාස්තු නැවත ලබාදීම හෝ ඒ වෙනුවට වෙනත් දිනයක්  හිලව් කිරීමක් සිදු  නොකරනු ඇත. ",
    "සර්වයර්  ජෙනරාල්ගේ සේවා අවශ්‍යතාවය මත මෙම  වෙන් කිරීම ඕනෑම අවස්ථාවක අවලංගු කිරීමට හැක",
    "එකම දිනයක  සංචාරක බංගලාවක් සඳහා අයදුම්පත් කිහිපයක් ලැබී  ඇතිවිට ජෙෂ්ඨත්වය , ප්‍රමුඛතාවය යන කරුණු වලට අදාලව සලකුණු ලබන අතර එකම තනතුරේ ආදුම්කරුවන් කිහිප දෙනෙකු ඉල්ලා ඇති විට  ඉල්ලුම්පත්  ලැබුණු දිනය පරීක්ෂා කර සුදුසු ඉල්ලුම්කරට වෙන් කරන ඇත.",
    "නවාතැන් ගන්නා අය වෙන් කල දිනයේ පස්වරු  හයට ප්‍රථම සංචාරක බංගලාව/ නිවාඩු නිකේතනය වෙත  පැමිණට වග බලාගත යුතුය",
    "බංගලාවල නවාතන ගත හැකි උපරිම සංඛ්‍යාවට වඩා වැඩි පිරිසක් රැගෙන යාම  නොකළ යුතු අතර එවනි අවස්ථාවක් වාර්තා වූ හොත් වෙන් කිරීම අවලංගු  කිරීමටත් ඉදිරියේදී ඉල්ලුම්කරුට සංචාරක බංගලා / නිවාඩු නිකේතන ලබා  නොදීමටත් කටයුතු කරනු ඇත. "
  ]
};


const FlyToMarker = ({ position, children }) => {
  const map = useMap();

  const handleClick = () => {
    map.flyTo(position, 12, { duration: 1.5 }); // zoom to level 12 smoothly
  };

  return (
    <Marker position={position} icon={darkMarker} eventHandlers={{ click: handleClick }}>
      {children}
    </Marker>
  );
};

const InfoPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);
  const [lang, setLang] = useState("en");

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

      {/* Rules Section */}
      <section id="rules" className="py-16 px-6 md:px-20 bg-gray-50 border-t border-gray-200">
        {/* Title + Language Switch */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {lang === "en" ? "Conditions to be agreed upon by applicants staying at Circuit Bungalows / Holiday Homes belonging to the Survey Department" : "මිනින්දෝරු දෙපාර්තමේන්තුවට අයත් සංචාරක බංගලාවල / නිවාඩු නිකේතනවල නවාතැන් ගන්නා ඉල්ලුම් කරුවන් විසින් එකග විය යුතු කොන්දේසි  "}
          </h2>
        </div>
        <div className="space-x-2 items-center justify-center mb-6 flex">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded ${lang === "en" ? "bg-gray-700 hover:bg-gray-500 text-white" : "bg-gray-200"}`}
          >
            English
          </button>
          <button
            onClick={() => setLang("si")}
            className={`px-3 py-1 rounded ${lang === "si" ? "bg-gray-700 hover:bg-gray-500 text-white" : "bg-gray-200"}`}
          >
            සිංහල
          </button>
        </div>

        {/* Rules */}
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 space-y-4 text-gray-800 leading-relaxed">
          <ol className="list-decimal list-inside space-y-3">
            {rules[lang].map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ol>
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
              <FlyToMarker key={i} position={b.position} icon={darkMarker}>
                <Popup className="bg-gray-200 text-gray-800 rounded-lg p-4 shadow-md">
                  <h3 className="font-bold text-lg">{b.name}</h3>
                  <p className="my-2">{b.description}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md transition">View Details</button>
                    <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1 rounded-md transition">Book Now</button>
                  </div>
                </Popup>
              </FlyToMarker>
            ))}
          </MapContainer>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InfoPage;
