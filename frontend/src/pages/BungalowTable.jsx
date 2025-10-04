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
    <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6 relative">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Bungalows</h1>
          <button
            onClick={() => navigate("/admin/addLocation")}
            className="absolute top-6 right-6 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            + Add Bungalow
          </button>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 border-r text-left font-medium">Name</th>
                  <th className="p-3 border-r text-left font-medium">Bedrooms</th>
                  <th className="p-3 border-r text-left font-medium">Living Areas</th>
                  <th className="p-3 border-r text-left font-medium">Bathrooms</th>
                  <th className="p-3 border-r text-left font-medium">Sleeps</th>
                  <th className="p-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {bungalow.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                      No bungalows found
                    </td>
                  </tr>
                ) : (
                  bungalow.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border-r">{b.name}</td>
                      <td className="p-3 border-r">{b.bedRooms}</td>
                      <td className="p-3 border-r">{b.Living_area}</td>
                      <td className="p-3 border-r">{b.bathrooms}</td>
                      <td className="p-3 border-r">{b.sleeps}</td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => handleView(b)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/admin/editLocation`, { state: b })}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
    </div>
    <Footer/>
    </>
  );
}
