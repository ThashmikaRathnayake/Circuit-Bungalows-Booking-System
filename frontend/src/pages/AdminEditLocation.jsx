import React, { useState } from "react";
import MediaUpload from "../Utils/MediaUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate,useLocation  } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logoLeft from '../assets/surveylogo.png'
import logoRight from '../assets/national-emblem-sri-lankan.png'

export default function AdminEditLocation({ bungalow }) {
  const location = useLocation()
  const [formData, setFormData] = useState({
  name: bungalow?.name || location.state?.name || "",
  description1: bungalow?.description1 || location.state?.description1 || "",
  description2: bungalow?.description2 || location.state?.description2 || "",
  images: bungalow?.images || location.state?.images || [],
  bedRooms: bungalow?.bedRooms || location.state?.bedRooms || 0,
  Living_area: bungalow?.Living_area || location.state?.Living_area || 0,
  bathrooms: bungalow?.bathrooms || location.state?.bathrooms || 0,
  sleeps: bungalow?.sleeps || location.state?.sleeps || 0,
  acAvailable: bungalow?.acAvailable || location.state?.acAvailable || false,
  tvAvailable: bungalow?.tvAvailable || location.state?.tvAvailable ||false,
  hotWaterAvailable: bungalow?.hotWaterAvailable || location.state?.hotWaterAvailable ||false,
  mini_kitchen: bungalow?.mini_kitchen || location.state?.mini_kitchen || 0,
  survey_charges: bungalow?.survey_charges || location.state?.survey_charges || "",
  land_charges: bungalow?.land_charges || location.state?.land_charges || "",
  other_charges: bungalow?.other_charges || location.state?.other_charges || "",
  cb_A_No: bungalow?.cb_A_No || location.state?.cb_A_No || "",
  cb_B_No: bungalow?.cb_B_No || location.state?.cb_B_No || "",
  cb_No: bungalow?.cb_No || location.state?.cb_No || "",
});


  const [newFiles, setNewFiles] = useState([]); // store newly selected files
  const [removedImages, setRemovedImages] = useState([]);
  const navigate = useNavigate();
  

  console.log(location)
  
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpload = async () => {
    if (newFiles.length === 0) return;

    try {
      // Upload new files
      const uploadedUrls = await Promise.all(newFiles.map((file) => MediaUpload(file)));

      // Add uploaded URLs to existing images
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      setNewFiles([]); // reset after upload
      toast.success("Images uploaded successfully!");
    } catch (err) {
      console.error("Error uploading images:", err);
      toast.error("Failed to upload images.");
    }
  };

  async function handleSubmit(e) {
  e.preventDefault();

  // Contact number validation only 10 digits allowed
  const phoneRegex = /^[0-9]{10}$/;

  if (
    (formData.cb_A_No && !phoneRegex.test(formData.cb_A_No)) ||
    (formData.cb_B_No && !phoneRegex.test(formData.cb_B_No)) ||
    (formData.cb_No && !phoneRegex.test(formData.cb_No))
  ) {
    toast.error("Contact numbers must contain exactly 10 digits.");
    return; // Stop form submission
  }

  try {
    // Upload only the new files
    const newUploadedUrls = await Promise.all(newFiles.map((file) => MediaUpload(file)));

    // Merge old + new images
    const allImages = [...formData.images, ...newUploadedUrls];

    // Final payload
    const payload = {
      ...formData,
      images: allImages,
      removedImages, 
    };

    console.log("Final form payload:", payload);

    // Get ID from location.state (the bungalow you passed while navigating)
    const bungalowId = location.state?._id;

    if (!bungalowId) {
      toast.error("No bungalow ID found!");
      return;
    }

    // UPDATE existing bungalow
    await axios.put(`http://localhost:3000/locationUpdate/${bungalowId}`, payload);

    toast.success("Bungalow updated successfully!");
    navigate("/admin/BungalowTable"); // redirect back to list
  } catch (err) {
    console.error("Error updating bungalow:", err);
    toast.error("Error updating bungalow. Please try again.");
  }
}


  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
            
          <img src={logoLeft} alt="Survey Dept Logo" className="h-16 w-16 object-contain" />
            
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold uppercase">
                  Survey Department of Sri Lanka
              </h1>
              <h2 className="text-lg font-semibold mt-1 underline">
                   Edit Circuit Bungalow Details of {formData.name}
              </h2>
            </div>
            
              <img src={logoRight} alt="Govt Logo" className="h-16 w-16 object-contain" />
        </div>

      {/* General Info */}
      <label className="block mb-1" htmlFor="name">Bungalow Name</label>
      <input
        type="text"
        name="name"
        placeholder="Bungalow Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded-lg"
      />

      <label className="block mb-1" htmlFor="description1">Short Description</label>
      <textarea
        name="description1"
        placeholder="Short Description"
        value={formData.description1}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded-lg"
      />

      <label className="block mb-1" htmlFor="description2">Detailed Description</label>
      <textarea
        name="description2"
        placeholder="Detailed Description"
        value={formData.description2}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded-lg"
      />

      {/* Image Upload */}
      <label className="block mb-1" htmlFor="file">Bungalow Images</label>
      <input
          type="file"
          multiple
          onChange={(e) => setNewFiles([...newFiles, ...e.target.files])}
          className="border p-2 rounded-lg"
        />
        <button type="button" onClick={handleUpload} className="ml-2 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 cursor-pointer">
          Upload
        </button>


      <div className="flex gap-2 mb-3">
        {(formData.images || []).map((img, i) => (
          <div key={i} className="relative">
            <img src={img} alt="preview" className="w-24 h-24 object-cover rounded mt-1" />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  images: prev.images.filter((_, index) => index !== i)
                }));
                setRemovedImages(prev => [...prev, img]); // optional
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>


      {/* Features */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
        <label className="block  mb-1" htmlFor="bedRooms">Bedrooms</label>
        <input type="number" name="bedRooms" placeholder="Bedrooms" value={formData.bedRooms} onChange={handleChange} className="border p-2 rounded-lg" required/>
        </div>

        <div className="flex flex-col">
        <label className="block mb-1" htmlFor="Living_area">Living Areas</label>
        <input type="number" name="Living_area" placeholder="Living Areas" value={formData.Living_area} onChange={handleChange} className="border p-2 rounded-lg" required/>
        </div>

        <div className="flex flex-col">
        <label className="block  mb-1" htmlFor="bathrooms">Bathrooms</label>
        <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} className="border p-2 rounded-lg" required/>
        </div>

        <div className="flex flex-col">
        <label className="block mb-1" htmlFor="sleeps">Sleeps</label>
        <input type="number" name="sleeps" placeholder="Sleeps" value={formData.sleeps} onChange={handleChange} className="border p-2 rounded-lg" required/>
        </div>
      </div>

      {/* Amenities */}
      <label className="block mt-4">
        <input type="checkbox" name="acAvailable" checked={formData.acAvailable} onChange={handleChange} />
        <span className="ml-2">AC Available</span>
      </label>
      <label className="block mt-4">
        <input type="checkbox" name="tvAvailable" checked={formData.tvAvailable} onChange={handleChange} />
        <span className="ml-2 ">TV Available</span>
      </label>
      <label className="block mt-4">
        <input type="checkbox" name="hotWaterAvailable" checked={formData.hotWaterAvailable} onChange={handleChange} />
        <span className="ml-2">Hot water Available</span>
      </label>

      <label className="block mt-2" htmlFor="mini_kitchen">Mini Kitchens</label>
      <input type="number" name="mini_kitchen" placeholder="Mini Kitchens" value={formData.mini_kitchen} onChange={handleChange} className="border p-2 w-full mt-2 rounded-lg" required/>

      {/* Charges */}
      <div className="font-semibold mt-4">Charges</div>
      <label className="block mb-1" htmlFor="survey_charges">Survey Charges</label>
      <input type="text" name="survey_charges" placeholder="Survey Charges" value={formData.survey_charges} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg" required/>

      <label className="block mb-1" htmlFor="land_charges">Land Charges</label>
      <input type="text" name="land_charges" placeholder="Land Charges" value={formData.land_charges} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg" required/>

      <label className="block mb-1" htmlFor="other_charges">Other Charges</label>
      <input type="text" name="other_charges" placeholder="Other Charges" value={formData.other_charges} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg" required/>

      {/* Contact */}
      <h2 className="font-semibold mt-4">Contact Numbers</h2>
      <label className="block mb-1" htmlFor="cb_A_No">CB-A Number</label>
      <input type="text" name="cb_A_No" placeholder="CB-A Number" value={formData.cb_A_No} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg" />

      <label className="block mb-1" htmlFor="cb_B_No">CB-B Number</label>
      <input type="text" name="cb_B_No" placeholder="CB-B Number" value={formData.cb_B_No} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg" />

      <label className="block mb-1" htmlFor="cb_No">General Contact Number</label>
      <input type="text" name="cb_No" placeholder="General Contact Number" value={formData.cb_No} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg" />

      <button type="submit" className="w-full bg-gray-600 text-white py-2 mt-4 rounded hover:bg-gray-700 cursor-pointer">
        Save Changes
      </button>
    </form>
    <Footer/>
    </>
  );
}
