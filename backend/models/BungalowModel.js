import mongoose from "mongoose";

const bungalowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description1: String,
  description2: String,
  images: [String], // Supabase URLs
  
  // Key Features
  bedRooms: Number,
  Living_area: Number,
  bathrooms: Number,
  sleeps: Number,

  // Amenities
  acAvailable: { type: Boolean, default: false },
  mini_kitchen: Number,
  tvAvailable: { type: Boolean, default: true },
  hotWaterAvailable: { type: Boolean, default: true },

  // Charges
  survey_charges: String,
  land_charges: String,
  other_charges: String,

  // Contact Numbers
  cb_A_No: String,
  cb_B_No: String,
  cb_No: String,
},{ timestamps: true });

const BungalowModel = mongoose.model("updateBungalow",bungalowSchema);
export default BungalowModel;