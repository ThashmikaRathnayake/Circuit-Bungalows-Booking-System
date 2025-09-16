import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    fullName: String,
    nic: String,
    addressOfficial: String,
    addressPersonal: String,
    phoneOfficial: String,
    phonePersonal: String,
    positionNature: String,
    institution: String,
    designation: String,
    service: String,
    grade: String,
    salaryCode: String,
    appointmentDate: String,
    requestedBungalow: String,
    requestedLeaveType: String,
    leaveFrom: String,
    leaveTo: String,
    leaveDays: String,
    substitutes: [
        { name: String, nic: String, relationship: String }
    ],
    retiredIdCard: [String],       // will store Supabase file URLs
    applicantSignature: [String],  // will store Supabase file URLs
    applicantDate: String,
});

const BookingFormModel = mongoose.model("bookingForm", bookingSchema)
export default BookingFormModel;