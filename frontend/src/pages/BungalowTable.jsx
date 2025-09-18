import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminBungalowTable() {
  const [bungalow, setBungalow] = useState([]);
  const navigate = useNavigate();
  const [a, setA] = useState("")
  const [selectedBungalow, setSelectedBungalow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Fetch all bungalows from backend
  const fetchBungalow = async () => {
    try {
      const res = await axios.get("http://localhost:3000/locationUpdate/getAll");
      setBungalow(res.data);
    } catch (err) {
      console.error("Error fetching bungalows:", err);
      toast.error("Failed to fetch bungalows.");
    }
  };

  useEffect(() => {
    fetchBungalow();
  }, [a]);

  // Delete bungalow
  const handleDelete = async (id) => {


    try {
      await axios.delete(`http://localhost:3000/locationUpdate/${id}`);
      toast.success("Bungalow deleted successfully!");
      setBungalow(bungalow.filter((b) => b._id !== id));
      setA(a+1)
    } catch (err) {
      console.error("Error deleting bungalow:", err);
      toast.error("Failed to delete bungalow.");
    }
  };

  // Open Modal
  const handleView = (bungalow) => {
    setSelectedBungalow(bungalow);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setSelectedBungalow(null);
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 bg-white shadow-md rounded-lg relative">
      <h1 className="text-2xl font-bold mb-4">Bungalows</h1>
      <button className="absolute right-3 top-4 p-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 cursor-pointer" onClick={()=>{navigate("/admin/addLocation")}}>+ Add Bungalow</button>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Bedrooms</th>
            <th className="p-2 border">Living Areas</th>
            <th className="p-2 border">Bathrooms</th>
            <th className="p-2 border">Sleeps</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bungalow.map((b) => (
            <tr key={b._id} className="text-center border-b border-collapse">
              <td className="p-2 border">{b.name}</td>
              <td className="p-2 border">{b.bedRooms}</td>
              <td className="p-2 border">{b.Living_area}</td>
              <td className="p-2 border">{b.bathrooms}</td>
              <td className="p-2 border">{b.sleeps}</td>
              <td className="p-2 flex justify-center gap-2 ">
                <button
                  onClick={() => handleView(b)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/admin/editLocation`,{state:b})}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {isModalOpen && selectedBungalow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-5xl relative overflow-y-auto max-h-[90vh] p-8">
            
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              {selectedBungalow.name}
            </h2>

            {/* Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p><strong>Bedrooms:</strong> {selectedBungalow.bedRooms}</p>
                <p><strong>Living Areas:</strong> {selectedBungalow.Living_area}</p>
                <p><strong>Bathrooms:</strong> {selectedBungalow.bathrooms}</p>
                <p><strong>Sleeps:</strong> {selectedBungalow.sleeps}</p>
              </div>
            </section>

            {/* Amenities */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <span className={`px-3 py-1 rounded-full text-sm text-center ${selectedBungalow.acAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  AC {selectedBungalow.acAvailable ? "✔" : "✖"}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm text-center ${selectedBungalow.tvAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  TV {selectedBungalow.tvAvailable ? "✔" : "✖"}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm text-center ${selectedBungalow.hotWaterAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  Hot Water {selectedBungalow.hotWaterAvailable ? "✔" : "✖"}
                </span>
              </div>
            </section>

            {/* Descriptions */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Description</h3>
              <div className="space-y-3 text-gray-600 leading-relaxed">
                <p>{selectedBungalow.description1}</p>
                <p>{selectedBungalow.description2}</p>
              </div>
            </section>

            {/* Images */}
            {selectedBungalow.images?.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedBungalow.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`bungalow-${i}`}
                      className="w-full h-40 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

    </div>
    <Footer/>
    </>
  );
}
