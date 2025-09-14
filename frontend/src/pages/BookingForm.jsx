import { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logoLeft from '../assets/surveylogo.png'
import logoRight from '../assets/national-emblem-sri-lankan.png'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    addressOfficial: "",
    addressPersonal: "",
    phoneOfficial: "",
    phonePersonal: "",
    positionNature: "", // active or retired
    institution: "",
    designation: "",
    service: "",
    grade: "",
    salaryCode: "",
    appointmentDate: "",
    requestedBungalow: "",
    requestedLeaveType: "",
    leaveFrom: "",
    leaveTo: "",
    leaveDays: "",
    substitutes: [{ name: "", nic: "", designation: "", department: "" }],
    applicantSignature: "",
    applicantDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...formData.substitutes];
    updated[index][field] = value;
    setFormData({ ...formData, substitutes: updated });
  };

  const addRow = () => {
    setFormData({
      ...formData,
      substitutes: [...formData.substitutes, { name: "", nic: "", designation: "", department: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
   <div className="bg-[#F8FAFC]"> 
    <Navbar />
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
      {/* Left Logo */}
      <img src={logoLeft} alt="Survey Dept Logo" className="h-16 w-16 object-contain" />

      {/* Title Section */}
      <div className="text-center flex-1">
        <h1 className="text-xl font-bold uppercase">
          Survey Department of Sri Lanka
        </h1>
        <h2 className="text-lg font-semibold mt-1 underline">
          Application Form for Circuit Bungalow Booking
        </h2>
      </div>

      {/* Right Logo */}
      <img src={logoRight} alt="Govt Logo" className="h-16 w-16 object-contain" />
    </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* NIC */}
        <div>
          <label className="block font-medium">NIC / Employee No</label>
          <input name="nic" value={formData.nic} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Address */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Address (Official)</label>
            <input name="addressOfficial" value={formData.addressOfficial} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Address (Personal)</label>
            <input name="addressPersonal" value={formData.addressPersonal} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Telephone (Official)</label>
            <input name="phoneOfficial" value={formData.phoneOfficial} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Telephone (Personal)</label>
            <input name="phonePersonal" value={formData.phonePersonal} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Position Nature */}
        <div>
          <label className="block font-medium">Nature of Position</label>
          <div className="flex gap-6">
            {['Active', 'Retired'].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="positionNature"
                  value={type.toLowerCase()}
                  checked={formData.positionNature === type.toLowerCase()}
                  onChange={handleChange}
                /> {type}
              </label>
            ))}
          </div>
        </div>

        {/* Conditional Employment Info */}
        {formData.positionNature === "active" && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Institution / Department</label>
              <input name="institution" value={formData.institution} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-medium">Position / Designation</label>
              <input name="designation" value={formData.designation} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Service</label>
                <input name="service" value={formData.service} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium">Grade</label>
                <input name="grade" value={formData.grade} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium">Salary Code</label>
                <input name="salaryCode" value={formData.salaryCode} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Appointment */}
        <div>
          <label className="block font-medium">Date of Appointment</label>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className="p-2 border rounded" />
        </div>

        {/* Requested Bungalow */}
        <div>
          <label className="block font-medium">Requested Circuit Bungalow</label>
          <input name="requestedBungalow" value={formData.requestedBungalow} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Leave Type */}
        <div>
          <label className="block font-medium">Type of Leave Requested</label>
          <div className="flex gap-6">
            {['Official', 'Casual'].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="requestedLeaveType"
                  value={type.toLowerCase()}
                  checked={formData.requestedLeaveType === type.toLowerCase()}
                  onChange={handleChange}
                /> {type}
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">From</label>
            <input type="date" name="leaveFrom" value={formData.leaveFrom} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">To</label>
            <input type="date" name="leaveTo" value={formData.leaveTo} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">No. of Days</label>
            <input name="leaveDays" value={formData.leaveDays} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Substitute Table */}
        <div>
          <label className="block font-medium mb-2">Substitute Person Details</label>
          <table className="w-full border border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">NIC/Employee No</th>
                <th className="border p-2">Designation</th>
                <th className="border p-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {formData.substitutes.map((row, index) => (
                <tr key={index}>
                  {['name', 'nic', 'designation', 'department'].map((field) => (
                    <td className="border p-2" key={field}>
                      <input
                        type="text"
                        value={row[field]}
                        onChange={(e) => handleRowChange(index, field, e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addRow} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
            + Add Row
          </button>
        </div>

        {/* Signature */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Applicant Signature</label>
            <input name="applicantSignature" value={formData.applicantSignature} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Date</label>
            <input type="date" name="applicantDate" value={formData.applicantDate} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-8">Submit</button>
      </form>
    </div>
     <Footer />
   </div> 
  );
}

