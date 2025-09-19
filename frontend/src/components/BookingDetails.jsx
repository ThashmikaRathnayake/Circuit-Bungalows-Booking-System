import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import MediaUpload from "../Utils/MediaUpload";

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("");

    const [booking, setBooking] = useState(null);

    const [showProcessPopup, setShowProcessPopup] = useState(false);
    const [showApprovePopup, setShowApprovePopup] = useState(false);
    const [showSdagPopup, setShowSdagPopup] = useState(false);

    const [approverName, setApproverName] = useState("");
    const [approverPosition, setApproverPosition] = useState("");
    const [signatureFile, setSignatureFile] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const isEditable = booking && (
        (booking.status === "pending" && userRole === "supervisor") ||
        (booking.status === "supervisor-approved" && userRole === "sdag")
    );

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        console.log("User role from localStorage:", role);
        setUserRole(role);
    }, []);

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
                setErrorMessage("Failed to load booking details. Please try again.");
            }
        };
        fetchBooking();
    }, [id]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);


    // Handle Supervisor Approval
    const handleApproveSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            let signatureUrl = "";
            const formData = new FormData();
            formData.append("approverName", approverName);
            formData.append("approverPosition", approverPosition);
            if (signatureFile) signatureUrl = await MediaUpload(signatureFile);

            await axios.post(`http://localhost:3000/admin/supervisor/approve/${id}`,
                {
                    approverName,
                    approverPosition,
                    signatureUrl
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }

            );

            setShowApprovePopup(false);
            navigate("/admin"); // back to dashboard
        } catch (err) {
            console.error(err);
            setErrorMessage("Approval failed. Please check the inputs and try again.");
        }
    };

    // Handle Supervisor Rejection
    const handleRejectSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3000/admin/supervisor/reject/${id}`,
                {
                    reason: rejectReason,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setShowProcessPopup(false);
            navigate("/admin");
        } catch (err) {
            console.error(err);
            setErrorMessage("Rejection failed. Please try again.");
        }
    };

    if (!booking) {
        return (
            <div className="p-6 text-center text-gray-600">
                Loading booking details...
            </div>
        );
    }

    const handleSdagApprove = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3000/admin/sdag/approve/${id}`,
                { approverName: "SDAG Name", approverPosition: "SDAG Position" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowSdagPopup(false);
            navigate("/admin"); // refresh list
        } catch (err) {
            console.error(err);
            setErrorMessage("SDAG approval failed. Try again.");
        }
    };

    const handleSdagReject = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3000/admin/sdag/reject/${id}`,
                { approverName: "SDAG Name", approverPosition: "SDAG Position" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowSdagPopup(false);
            navigate("/admin");
        } catch (err) {
            console.error(err);
            setErrorMessage("SDAG rejection failed. Try again.");
        }
    };


    const ErrorAlert = ({ message }) =>
        message ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                {message}
            </div>
        ) : null;


    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-1 p-6 md:p-12">
                <ErrorAlert message={errorMessage} />
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
                                <Field label="Email" value={booking.email} />
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
                            <Section title="People Staying">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-300 rounded-md">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="border px-4 py-2 text-left">Name</th>
                                                <th className="border px-4 py-2 text-left">NIC</th>
                                                <th className="border px-4 py-2 text-left">Relationship</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {booking.substitutes.map((s, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="border px-4 py-2">{s.name}</td>
                                                    <td className="border px-4 py-2">{s.nic}</td>
                                                    <td className="border px-4 py-2">{s.relationship}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Section>
                        )}

                        {/* Declaration */}
                        <Section title="Declaration">
                            <div className="space-y-4">
                                <Field label="Applicant Date" value={booking.applicantDate} />
                                <FileList
                                    label="Applicant Signature"
                                    files={booking.applicantSignature}
                                />
                            </div>
                        </Section>


                        {/* Process Button */}
                        <div className="text-center">
                            <div className="text-center">
                                {userRole === "supervisor" && booking.status === "pending" && (
                                    <button
                                        onClick={() => setShowProcessPopup(true)}
                                        className={`px-6 py-3 rounded-md text-lg font-semibold 
                        bg-green-700 hover:bg-green-800 text-white`}
                                    >
                                        Review For Approval
                                    </button>
                                )}

                                {userRole === "sdag" && booking.status === "supervisor-approved" && (
                                    <button
                                        onClick={() => setShowSdagPopup(true)}
                                        className={`px-6 py-3 rounded-md text-lg font-semibold 
                        bg-green-700 hover:bg-green-800 text-white`}
                                    >
                                        Approve
                                    </button>
                                )}

                                {/* Disabled if already approved/rejected */}
                                {!isEditable && (
                                    <button
                                        disabled
                                        className="px-6 py-3 rounded-md text-lg font-semibold bg-gray-400 text-white cursor-not-allowed"
                                    >
                                        {booking.status.includes("approved") ? "Approved" : "Rejected"}
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            {/* Process Popup */}
            {showProcessPopup && (
                <Popup onClose={() => setShowProcessPopup(false)}>
                    <div className="space-y-6">
                        <ErrorAlert message={errorMessage} />
                        {/* Description */}
                        <p className="mb-6 text-gray-700">
                            It is certified that the above officer, attached to the{" "}
                            <span className="font-semibold">{booking.service}</span> service
                            in the grade of{" "}
                            <span className="font-semibold">{booking.grade}</span>,
                            is considered{" "}
                            <span className="italic">eligible / not eligible</span> {" "}
                            for accommodation at the Circuit Bungalow / Holiday Resort.
                        </p>



                        {/* Action buttons */}
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                                onClick={() => {
                                    setShowProcessPopup(false);
                                    setShowApprovePopup(true);
                                }}
                            >
                                Approve
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                                onClick={handleRejectSubmit}
                            >
                                Reject
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                                onClick={() => setShowProcessPopup(false)}
                            >
                                Close
                            </button>
                        </div>

                        {/* Rejection Reason */}
                        <div>
                            <label
                                htmlFor="rejectReason"
                                className="block text-sm font-medium text-gray-600 mb-2"
                            >
                                Reason for Rejection (if applicable)
                            </label>
                            <textarea
                                id="rejectReason"
                                placeholder="Enter reason..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                                rows={4}
                            />
                        </div>
                    </div>
                </Popup>

            )}

            {/* Approve Popup */}
            {showApprovePopup && (
                <Popup onClose={() => setShowApprovePopup(false)}>
                    <div className="space-y-6">
                        <ErrorAlert message={errorMessage} />
                        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                            Approval Details
                        </h3>
                        <p className="text-gray-700 text-sm">
                            Please fill in the approver's details and upload the signature for official approval.
                        </p>

                        <div className="space-y-4">
                            {/* Approver Name */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">
                                    Approver Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    value={approverName}
                                    onChange={(e) => setApproverName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Approver Position */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">
                                    Position / Designation
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter position"
                                    value={approverPosition}
                                    onChange={(e) => setApproverPosition(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Signature Upload */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">
                                    Upload Signature
                                </label>
                                <p className="text-gray-500 text-sm mb-2">
                                    Please upload your official signature (image or PDF).
                                </p>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setSignatureFile(e.target.files[0])}
                                    className="w-full border border-gray-300 rounded-md p-2 cursor-pointer"
                                />
                                {signatureFile && (
                                    <p className="text-green-600 text-sm mt-1">
                                        Selected file: {signatureFile.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                                onClick={handleApproveSubmit}
                            >
                                Confirm Approval
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                                onClick={() => setShowApprovePopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Popup>
            )}

            {/* SDAG Confirm Popup */}
            {userRole === "sdag" && booking.status === "supervisor-approved" && showSdagPopup && (
                <Popup onClose={() => setShowSdagPopup(false)}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                            Confirm SDAG Approval
                        </h3>
                        <p className="text-gray-700 text-sm text-center">
                            Are you sure you want to approve this booking?
                        </p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                                onClick={handleSdagApprove}
                            >
                                Approve
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                                onClick={handleSdagReject} 
                            >
                                Reject
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                                onClick={() => setShowSdagPopup(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Popup>
            )}

        </div>
    );
};

// Reusable Popup Component
const Popup = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative">
            {children}
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
                ✕
            </button>
        </div>
    </div>
);

// Helper Components
const Section = ({ title, children }) => (
    <div className="border rounded-lg p-6 bg-gray-50 shadow-sm">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            {title}
        </h3>
        {children}
    </div>
);

const Field = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="mt-1 text-gray-800 border-b border-gray-300 pb-1">
            {value || "-"}
        </p>
    </div>
);

const FileList = ({ label, files }) => (
    <div>
        <p className="text-sm text-gray-500 font-medium mb-2">{label}:</p>
        {files?.length ? (
            <div className="flex flex-wrap gap-3 ">
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
