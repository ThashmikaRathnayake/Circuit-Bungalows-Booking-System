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

  return (
    <>
    <Navbar/>
    <div className="p-6 bg-white shadow-md rounded-lg relative">
      <h1 className="text-2xl font-bold mb-4">Bungalows</h1>
      <button className="absolute right-3 top-4 p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 cursor-pointer" onClick={()=>{navigate("/admin/addLocation")}}>+ Add Bungalow</button>
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
                  onClick={() => navigate(`/bungalow/view/${b._id}`)}
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
    </div>
    <Footer/>
    </>
  );
}
