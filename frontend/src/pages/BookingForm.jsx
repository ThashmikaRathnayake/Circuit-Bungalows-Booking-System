import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logoLeft from '../assets/surveylogo.png'
import logoRight from '../assets/national-emblem-sri-lankan.png'
import MediaUpload from "../Utils/MediaUpload";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const bungalowPrices = {
  "diyathalawa CB 01": { survey: 500, land: 1000, other: 5000 },
  "diyathalawa CB 02": { survey: 500, land: 1000, other: 3000 },
  "diyathalawa CB 03": { survey: 300, land: 500, other: 1200 },
  "diyathalawa HQ 41": { survey: 300, land: 500, other: 1200 },
  "diyathalawa HQ 38": { survey: 300, land: 500, other: 1200 },
  "diyathalawa HQ 45": { survey: 300, land: 500, other: 1200 },
  "Anuradhapura": { survey: 500, land: 1000, other: 3500 },
  "Nuwara Eliya": { survey: 500, land: 1000, other: 3500 },
  "jaffna CB": { survey: 300, land: 1000, other: null },
  "ampara CB": { survey: 300, land: 500, other: 1200 },
  "katharagama CB": { survey: 500, land: 1000, other: 1500 },
  "girithale CB": { survey: 600, land: 1200, other: null },
  "kuchchaveli CB-A": { survey: 600, land: 1200, other: 5000 },
  "kuchchaveli CB-B": { survey: 600, land: 1200, other: 5000 },
  "Other": { survey: 600, land: 1200, other: 0 }, // fallback
};


export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    addressOfficial: "",
    addressPersonal: "",
    email: "",
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
    substitutes: [{ name: "", nic: "", relationship: "" }],
    retiredIdCard: [],
    applicantSignature: [],
    applicantDate: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  if (location.state?.bungalow) {
      const bungalowKey = location.state.bungalow
        .replace(/\s+/g, " ") 
        .replace(/\bcb\b/i, "CB")
        .trim();
      setFormData((prev) => ({
        ...prev,
        requestedBungalow: bungalowKey,
      }));
    }
  }, [location.state]);



  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    //  NIC must be exactly 12 digits (numeric only)
    if (!/^[0-9]{12}$/.test(formData.nic.trim())) {
      newErrors.nic = "NIC must contain exactly 12 digits (numbers only)";
    }

    //  Phone numbers must be exactly 10 digits
    if (!/^[0-9]{10}$/.test(formData.phonePersonal.trim())) {
      newErrors.phonePersonal = "Personal phone must contain exactly 10 digits";
    }
    if (formData.phoneOfficial && !/^[0-9]{10}$/.test(formData.phoneOfficial.trim())) {
      newErrors.phoneOfficial = "Official phone must contain exactly 10 digits";
    }

    if (!formData.requestedBungalow.trim()) {
      newErrors.requestedBungalow = "Requested bungalow is required";
    }

    if (!formData.leaveFrom || !formData.leaveTo) {
      newErrors.leave = "Leave dates are required";
    } else if (new Date(formData.leaveFrom) > new Date(formData.leaveTo)) {
      newErrors.leave = "Leave From cannot be after Leave To";
    }

    //  Leave Days must be 1–2 digits (01–99)
    if (!/^[0-9]{1,2}$/.test(formData.leaveDays.trim())) {
      newErrors.leaveDays = "Number of days must be 1 or 2 digits only";
    }

    if (!formData.applicantDate) {
      newErrors.applicantDate = "Applicant date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


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

  const handleFileChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: Array.from(e.target.files), });
  };


 async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
    toast.error("Please fix the errors before submitting");
    return;
  }

    const promisesArray = [];

    // Upload retired ID card(s)
    for (let i = 0; i < formData.retiredIdCard.length; i++) {
      promisesArray.push(MediaUpload(formData.retiredIdCard[i]));
    }

    // Upload applicant signature(s)
    for (let i = 0; i < formData.applicantSignature.length; i++) {
      promisesArray.push(MediaUpload(formData.applicantSignature[i]));
    }

    try {
      const responses = await Promise.all(promisesArray);
      console.log("All uploaded:", responses);

      // responses will be an array of uploaded file URLs/paths
      // you can split them like this:
      const retiredIdUrls = responses.slice(0, formData.retiredIdCard.length);
      const signatureUrls = responses.slice(formData.retiredIdCard.length);

      const payload = {
        ...formData,
        retiredIdCard: retiredIdUrls,
        applicantSignature: signatureUrls,
      };

      console.log("Final form payload:", payload);

      // save to MongoDB
      axios.post("http://localhost:3000/admin", payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})


      .then((res) => {
        console.log("Form submitted successfully:", res.data);
        toast.success("Booking request submitted successfully!");
        navigate("/")
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        toast.error("Error submitting request. Please try again.");
      });

    } catch (error) {
      console.error("Upload error:", error);
    }
  }

  return (
   <div className="bg-[#F8FAFC]"> 
    <Navbar />
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <div className="flex items-center justify-between mb-6 border-b pb-4">

      <img src={logoLeft} alt="Survey Dept Logo" className="h-16 w-16 object-contain" />

      <div className="text-center flex-1">
        <h1 className="text-xl font-bold uppercase">
          Survey Department of Sri Lanka
        </h1>
        <h2 className="text-lg font-semibold mt-1 underline">
          Application Form for Circuit Bungalow Booking
        </h2>
      </div>

      <img src={logoRight} alt="Govt Logo" className="h-16 w-16 object-contain" />
    </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium">Full Name</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block font-medium">NIC / Employee No</label>
          <input name="nic" value={formData.nic} onChange={handleChange} className="w-full p-2 border rounded" />
          {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Address (Official)</label>
            <input name="addressOfficial" value={formData.addressOfficial} onChange={handleChange} className="w-full p-2 border rounded" required/>
          </div>
          <div>
            <label className="block font-medium">Address (Personal)</label>
            <input name="addressPersonal" value={formData.addressPersonal} onChange={handleChange} className="w-full p-2 border rounded" required/>
          </div>
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Telephone (Official)</label>
            <input name="phoneOfficial" value={formData.phoneOfficial} onChange={handleChange} className="w-full p-2 border rounded" required/>
          </div>
          <div>
            <label className="block font-medium">Telephone (Personal)</label>
            <input name="phonePersonal" value={formData.phonePersonal} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.phonePersonal && <p className="text-red-500 text-sm">{errors.phonePersonal}</p>}
          </div>
        </div>

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
                required/> {type}
              </label>
            ))}
          </div>
        </div>

        {formData.positionNature === "active" && (
          <div className="space-y-4">
            <div className="flex gap-6">
              <label className="block font-medium">Department:</label>
            {["survey", "land", "other"].map((dept) => (
              <label key={dept} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="institution"
                  value={dept}
                  checked={formData.institution === dept}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                />
                <span className="capitalize">{dept}</span>
              </label>
            ))}
          </div>

          {/* Display price only for selected department */}
          {formData.institution && (
            <p className="mt-2 text-gray-700">
              Price for <span className="font-semibold capitalize">{formData.institution}</span>, Circuit Bungalow <span className="font-semibold capitalize">{ formData.requestedBungalow }</span> of Survey: 
              Rs. {bungalowPrices[formData.requestedBungalow]?.[formData.institution] ?? "N/A"}
            </p>
          )}

            <div>
              <label className="block font-medium">Position / Designation</label>
              <input name="designation" value={formData.designation} onChange={handleChange} className="w-full p-2 border rounded" required/>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Service</label>
                <input name="service" value={formData.service} onChange={handleChange} className="w-full p-2 border rounded" required/>
              </div>
              <div>
                <label className="block font-medium">Grade</label>
                <input name="grade" value={formData.grade} onChange={handleChange} className="w-full p-2 border rounded" required/>
              </div>
              <div>
                <label className="block font-medium">Salary Code</label>
                <input name="salaryCode" value={formData.salaryCode} onChange={handleChange} className="w-full p-2 border rounded" required/>
              </div>
            </div>
          </div>
        )}

        {formData.positionNature === "retired" && (
          <>
            <div className="mt-4">
                <label className="block font-medium">Upload Retired ID Card</label>
                <input
                type="file" multiple
                accept="image/*,application/pdf"
                onChange={(e) => handleFileChange(e, "retiredIdCard")}
                className="w-full p-2 border rounded"
                required/>
            </div>
            
            <div className="flex gap-6">
              <label className="block font-medium">Department:</label>
            {["survey", "land", "other"].map((dept) => (
              <label key={dept} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="institution"
                  value={dept}
                  checked={formData.institution === dept}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                />
                <span className="capitalize">{dept}</span>
              </label>
            ))}
          </div>
          {/* Display price only for selected department */}
          {formData.institution && (
            <p className="mt-2 text-gray-700">
              Price for <span className="font-semibold capitalize">{formData.institution}</span>, Circuit Bungalow <span className="font-semibold capitalize">{ formData.requestedBungalow }</span> of Survey: 
              Rs. {bungalowPrices[formData.requestedBungalow]?.[formData.institution] ?? "N/A"}
            </p>
          )}
            </>
            )}

        <div>
          <label className="block font-medium">Date of Appointment</label>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className="p-2 border rounded" required/>
        </div>

        <div>
        <label className="block font-medium">Requested Circuit Bungalow</label>
        <select
          name="requestedBungalow"
          value={formData.requestedBungalow}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select a Bungalow --</option>
          {Object.keys(bungalowPrices).map((bungalow) => (
            <option key={bungalow} value={bungalow}>
              {bungalow}
            </option>
          ))}
        </select>
      </div>


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
                required/> {type}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">From</label>
            <input type="date" name="leaveFrom" value={formData.leaveFrom} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.leaveFrom && <p className="text-red-500 text-sm">{errors.leaveFrom}</p>}
          </div>
          <div>
            <label className="block font-medium">To</label>
            <input type="date" name="leaveTo" value={formData.leaveTo} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.leaveTo && <p className="text-red-500 text-sm">{errors.leaveTo}</p>}
          </div>
          <div>
            <label className="block font-medium">No. of Days</label>
            <input name="leaveDays" value={formData.leaveDays} onChange={handleChange} className="w-full p-2 border rounded" required/>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Details of people styaing</label>
          <table className="w-full border border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">NIC</th>
                <th className="border p-2">Relationship</th>
              </tr>
            </thead>
            <tbody>
              {formData.substitutes.map((row, index) => (
                <tr key={index}>
                  {['name', 'nic', 'relationship'].map((field) => (
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
          <button type="button" onClick={addRow} className="mt-2 px-3 py-1 bg-gray-500 hover:bg-gray-600 cursor-pointer text-white rounded">
            + Add Row
          </button>
        </div>

        <p>
          I hereby confirm that the above-mentioned details are correct and that I agree to the conditions stated in the <span className="text-blue-500 cursor-pointer" onClick={()=>{navigate("/infoPage")}}>rules</span>. I also undertake to ensure that only the permitted number of residents will be accommodated here. Furthermore, if any damage is caused to the property of this tourist bungalow by those residents, I agree to personally bear the responsibility of paying for such damages.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Applicant Signature</label>
            <input type="file" multiple accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, "applicantSignature")} className="w-full p-2 border rounded" required/>
          </div>
          <div>
            <label className="block font-medium">Date</label>
            <input type="date" name="applicantDate" value={formData.applicantDate} onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.applicantDate && <p className="text-red-500 text-sm">{errors.applicantDate}</p>}
          </div>
        </div>
        <button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded mt-8 cursor-pointer">Submit</button>
      </form>
    </div>
     <Footer />
   </div> 
  );
}

