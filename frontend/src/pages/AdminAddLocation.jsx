import React, { useState } from "react";
import MediaUpload from "../Utils/MediaUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate  } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AdminAddLocation({ bungalow }) {
  const [formData, setFormData] = useState({
    name: bungalow?.name || "",
    description1: bungalow?.description1 || "",
    description2: bungalow?.description2 || "",
    images: bungalow?.images || [],
    bedRooms: bungalow?.bedRooms || 0,
    Living_area: bungalow?.Living_area || 0,
    bathrooms: bungalow?.bathrooms || 0,
    sleeps: bungalow?.sleeps || 0,
    acAvailable: bungalow?.acAvailable || false,
    tvAvailable: bungalow?.tvAvailable || false,
    hotWaterAvailable: bungalow?.hotWaterAvailable || false,
    mini_kitchen: bungalow?.mini_kitchen || 0,
    survey_charges: bungalow?.survey_charges || "",
    land_charges: bungalow?.land_charges || "",
    other_charges: bungalow?.other_charges || "",
    cb_A_No: bungalow?.cb_A_No || "",
    cb_B_No: bungalow?.cb_B_No || "",
    cb_No: bungalow?.cb_No || "",
  });

  const [newFiles, setNewFiles] = useState([]); // store newly selected files
  const navigate = useNavigate();
  
  
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

    try {
      // Only upload **new files** before saving
      const promisesArray = newFiles.map((file) => MediaUpload(file));
      const newUploadedUrls = await Promise.all(promisesArray);

      // Combine already uploaded images with newly uploaded ones
      const allImages = [...formData.images, ...newUploadedUrls];

      const payload = {
        ...formData,
        images: allImages,
      };

      console.log("Final form payload:", payload);

      if (bungalow) {
        // UPDATE existing bungalow
        axios
          .put(`http://localhost:3000/locationUpdate/${bungalow._id}`, payload)
          .then((res) => {
            console.log("Bungalow updated:", res.data);
            toast.success("Bungalow updated successfully!");
            navigate("/");
          })
          .catch((err) => {
            console.error("Error updating bungalow:", err);
            toast.error("Error updating bungalow. Please try again.");
          });
      } else {
        // CREATE new bungalow
        axios
          .post("http://localhost:3000/locationUpdate", payload)
          .then((res) => {
            console.log("Bungalow created:", res.data);
            toast.success("Bungalow added successfully!");
            navigate("/");
          })
          .catch((err) => {
            console.error("Error creating bungalow:", err);
            toast.error("Error adding bungalow. Please try again.");
          });
      }
    } catch (err) {
      console.error("Error uploading images:", err);
      toast.error("Failed to upload images.");
    }
  }

  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{bungalow ? "Edit Bungalow" : "Add New Bungalow"}</h1>

      {/* General Info */}
      <input
        type="text"
        name="name"
        placeholder="Bungalow Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <textarea
        name="description1"
        placeholder="Short Description"
        value={formData.description1}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <textarea
        name="description2"
        placeholder="Detailed Description"
        value={formData.description2}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      {/* Image Upload */}
      <div className="mb-3">
        <input type="file" multiple onChange={(e) => setNewFiles([...e.target.files])} className="border p-2"/>
        <button type="button" onClick={handleUpload} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer">
          Upload
        </button>
      </div>

      <div className="flex gap-2 mb-3">
        {formData.images.map((img, i) => (
          <img key={i} src={img} alt="preview" className="w-24 h-24 object-cover rounded" />
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4">
        <input type="number" name="bedRooms" placeholder="Bedrooms" value={formData.bedRooms} onChange={handleChange} className="border p-2" />
        <input type="number" name="Living_area" placeholder="Living Areas" value={formData.Living_area} onChange={handleChange} className="border p-2" />
        <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} className="border p-2" />
        <input type="number" name="sleeps" placeholder="Sleeps" value={formData.sleeps} onChange={handleChange} className="border p-2" />
      </div>

      {/* Amenities */}
      <label className="block mt-4">
        <input type="checkbox" name="acAvailable" checked={formData.acAvailable} onChange={handleChange} />
        <span className="ml-2">AC Available</span>
      </label>
      <label className="block mt-4">
        <input type="checkbox" name="tvAvailable" checked={formData.tvAvailable} onChange={handleChange} />
        <span className="ml-2">TV Available</span>
      </label>
      <label className="block mt-4">
        <input type="checkbox" name="hotWaterAvailable" checked={formData.hotWaterAvailable} onChange={handleChange} />
        <span className="ml-2">Hot water Available</span>
      </label>
      <input type="number" name="mini_kitchen" placeholder="Mini Kitchens" value={formData.mini_kitchen} onChange={handleChange} className="border p-2 w-full mt-2" />

      {/* Charges */}
      <h2 className="font-semibold mt-4">Charges</h2>
      <input type="text" name="survey_charges" placeholder="Survey Charges" value={formData.survey_charges} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="land_charges" placeholder="Land Charges" value={formData.land_charges} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="other_charges" placeholder="Other Charges" value={formData.other_charges} onChange={handleChange} className="border p-2 w-full mb-2" />

      {/* Contact */}
      <h2 className="font-semibold mt-4">Contact Numbers</h2>
      <input type="text" name="cb_A_No" placeholder="CB-A Number" value={formData.cb_A_No} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="cb_B_No" placeholder="CB-B Number" value={formData.cb_B_No} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="cb_No" placeholder="General Contact Number" value={formData.cb_No} onChange={handleChange} className="border p-2 w-full mb-2" />

      <button type="submit" className="w-full bg-green-600 text-white py-2 mt-4 rounded hover:bg-green-700 cursor-pointer">
        Save
      </button>
    </form>
    <Footer/>
    </>
  );
}
