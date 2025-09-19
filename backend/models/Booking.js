import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    fullName: String,
    nic: String,
    email: { type: String, required: true },  
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

    status: {
        type: String,
        enum: [
        "pending",
        "supervisor-approved",
        "supervisor-rejected",
        "sdag-approved",
        "sdag-rejected",
        "confirmed"
        ],
        default: "pending"
    },
    
    approvals: {
        supervisor: {
        name: String,
        position: String,
        signatureUrl: String,
        date: Date,
        decision: String
        },
        sdag: {
        name: String,
        position: String,
        signatureUrl: String,
        date: Date,
        decision: String
        }
    }
});

const BookingFormModel = mongoose.model("bookingForm", bookingSchema)
export default BookingFormModel;