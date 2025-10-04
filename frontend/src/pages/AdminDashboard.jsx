import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    fetchRequests(role);
  }, []);

  const fetchRequests = async (role) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/admin/requests", {
        headers: { Authorization: `Bearer ${token}` },
        params: { role },
      });
      setRequests(res.data.bookings || []);
    } catch (err) {
      console.error(err);
    }
  };

  const statusClasses = {
    "supervisor-approved": "bg-gray-100 text-gray-800 border-l-4 border-green-500",
    "sdag-approved": "bg-gray-100 text-gray-800 border-l-4 border-gray-500",
    "supervisor-rejected": "bg-gray-100 text-gray-800 border-l-4 border-red-500",
    "sdag-rejected": "bg-gray-100 text-gray-800 border-l-4 border-red-700",
    "pending": "bg-gray-100 text-gray-800 border-l-4 border-yellow-500",
  };

  const statusLabels = {
  "supervisor-approved": "Reviewed by Supervisor",
  "sdag-approved": "Confirmed",
  "supervisor-rejected": "Not Recommended by Supervisor",
  "sdag-rejected": "Rejected by SDAG",
  "pending": "Awaiting Review",
};


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-wide">
            Booking Requests{" "}
            <span className="text-gray-500 text-lg font-normal">
              ({userRole === "supervisor"
                ? "Supervisor"
                : userRole === "sdag"
                ? "SDAG"
                : "User"}
              )
            </span>
          </h2>

          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
                <tr>
                  <th className="px-6 py-3 text-center font-medium border-r ">Full Name</th>
                  <th className="px-6 py-3 text-center font-medium border-r">Bungalow</th>
                  <th className="px-6 py-3 text-center font-medium border-r">Submitted Date</th>
                  <th className="px-6 py-3 text-center font-medium border-r">Status</th>
                  <th className="px-6 py-3 text-center font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-sm">
                {requests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500 italic"
                    >
                      No booking requests found
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-3 border-r text-center">{req.fullName}</td>
                      <td className="px-6 py-3 border-r text-center">{req.requestedBungalow}</td>
                      <td className="px-6 py-3 border-r text-center">{req.applicantDate}</td>
                      <td className="px-6 py-3 border-r text-center">
                        <span
                          className={`inline-flex justify-center items-center text-sm font-medium rounded-md h-12 w-50 ${statusClasses[req.status] || statusClasses["pending"]
                            }`}
                        >
                          {statusLabels[req.status] || "Awaiting Review"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => navigate(`/admin/booking/${req._id}`)}
                          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm transition"
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
