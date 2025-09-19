import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/admin/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setRequests(res.data.bookings || []);
    } catch (err) {
      console.error(err);
    }
  };

  const statusClasses = {
    "supervisor-approved": "bg-green-100 text-green-700",
    "sdag-approved": "bg-green-100 text-green-700",
    "supervisor-rejected": "bg-red-100 text-red-700",
    "sdag-rejected": "bg-red-100 text-red-700",
    "confirmed": "bg-gray-100 text-gray-700",
    "pending": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Booking Requests
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full border border-gray-300 rounded-md shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left border">Full Name</th>
                <th className="px-6 py-3 text-left border">Bungalow</th>
                <th className="px-6 py-3 text-left border">Submitted Date</th>
                <th className="px-6 py-3 text-left border">Status</th>
                <th className="px-6 py-3 text-center border">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-6 text-gray-500">
                    No booking requests found
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id}>
                    <td className="px-6 py-4 text-gray-800 border">{req.fullName}</td>
                    <td className="px-6 py-4 text-gray-800 border">{req.requestedBungalow}</td>
                    <td className="px-6 py-4 text-gray-800 border">{req.applicantDate}</td>
                    <td className="px-6 py-3 border capitalize">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${statusClasses[req.status] || statusClasses["pending"]
                          }`}
                      >
                        {req.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-3 border text-center">
                      <button
                        onClick={() => navigate(`/admin/booking/${req._id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
