import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AvailabilityCalendar({ bungalowName, onClose }) {
  const [bookedRanges, setBookedRanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        setLoading(true);
        console.log(`Fetching availability for: ${bungalowName}`);
        
        // Get the token from localStorage
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Please log in to check availability");
          setLoading(false);
          return;
        }

        // Include Authorization header with the request
        const res = await axios.get(
          `http://localhost:3000/admin/availability/${encodeURIComponent(bungalowName)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        console.log("Booked dates response:", res.data);
        setBookedRanges(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching booked dates:", err);
        if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else {
          setError("Failed to load availability data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (bungalowName) {
      fetchBookedDates();
    }
  }, [bungalowName]);

  // Helper to check if a date falls within a booked range
  const isBooked = (date) => {
    return bookedRanges.some(range => {
      const from = new Date(range.leaveFrom);
      const to = new Date(range.leaveTo);
      
      // Normalize dates to avoid time zone issues
      const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const fromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
      const toDate = new Date(to.getFullYear(), to.getMonth(), to.getDate());
      
      return checkDate >= fromDate && checkDate <= toDate;
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
            <p className="ml-3">Loading availability...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-semibold mb-4 text-center">
          Availability for {bungalowName}
        </h2>
        
        {error ? (
          <div className="text-center">
            <div className="text-red-500 mb-4">{error}</div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <Calendar
              tileDisabled={({ date }) => isBooked(date)}
              tileClassName={({ date }) =>
                isBooked(date) ? "bg-red-300 text-white cursor-not-allowed" : ""
              }
              className="w-full"
            />
            <div className="mt-4 space-y-2">
              <p className="text-center text-sm text-gray-600">
                Booked dates are highlighted 
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-500 text-white rounded-lg"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
