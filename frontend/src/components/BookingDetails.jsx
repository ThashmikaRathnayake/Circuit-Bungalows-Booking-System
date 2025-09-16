import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data.singleBookinginfo);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooking();
  }, [id]);

  if (!booking) {
    return <div className="p-6 text-center text-gray-600">Loading booking details...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
          <header className="bg-blue-800 text-white p-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">Official Booking Form</h1>
          </header>

          <div className="p-8 space-y-10">
            {/* Applicant Info */}
            <Section title="Applicant Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name" value={booking.fullName} />
                <Field label="NIC" value={booking.nic} />
                <Field label="Official Address" value={booking.addressOfficial} />
                <Field label="Personal Address" value={booking.addressPersonal} />
                <Field label="Phone (Official)" value={booking.phoneOfficial} />
                <Field label="Phone (Personal)" value={booking.phonePersonal} />
                <Field label="Position Nature" value={booking.positionNature} />
                {booking.positionNature === "active" && (
                  <>
                    <Field label="Institution" value={booking.institution} />
                    <Field label="Designation" value={booking.designation} />
                    <Field label="Service" value={booking.service} />
                    <Field label="Grade" value={booking.grade} />
                    <Field label="Salary Code" value={booking.salaryCode} />
                  </>
                )}
                {booking.positionNature === "retired" && (
                  <FileList label="Retired ID" files={booking.retiredIdCard} />
                )}
              </div>
            </Section>

            {/* Leave Request */}
            <Section title="Leave Request Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Requested Bungalow" value={booking.requestedBungalow} />
                <Field label="Leave Type" value={booking.requestedLeaveType} />
                <Field label="Leave From" value={booking.leaveFrom} />
                <Field label="Leave To" value={booking.leaveTo} />
                <Field label="No. of Days" value={booking.leaveDays} />
              </div>
            </Section>

            {/* Substitutes */}
            {booking.substitutes?.length > 0 && (
              <Section title="Substitutes">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">NIC</th>
                        <th className="border px-4 py-2 text-left">Designation</th>
                        <th className="border px-4 py-2 text-left">Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking.substitutes.map((s, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{s.name}</td>
                          <td className="border px-4 py-2">{s.nic}</td>
                          <td className="border px-4 py-2">{s.designation}</td>
                          <td className="border px-4 py-2">{s.department}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {/* Declaration */}
            <Section title="Declaration">
              <Field label="Applicant Date" value={booking.applicantDate} />
              <FileList label="Applicant Signature" files={booking.applicantSignature} />
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper Components
const Section = ({ title, children }) => (
  <div className="border rounded-lg p-6 bg-gray-50 shadow-sm">
    <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">{title}</h3>
    {children}
  </div>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className="mt-1 text-gray-800 border-b border-gray-300 pb-1">{value || "-"}</p>
  </div>
);

const FileList = ({ label, files }) => (
  <div className="mt-4">
    <p className="text-sm text-gray-500 font-medium mb-2">{label}:</p>
    {files?.length ? (
      <div className="flex flex-wrap gap-3">
        {files.map((url, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-50 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-100 transition"
          >
            File {i + 1}
          </a>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 mt-1">No files uploaded</p>
    )}
  </div>
);


export default BookingDetails;
