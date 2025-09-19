import { sendEmail } from "../utils/email.js";
import BookingFormModel from "../models/Booking.js";

//save all booking requests in db
export const createBooking = async (req, res) => {
  try {
    const { id, email } = req.user;  

    const {
      fullName,
      nic,
      addressOfficial,
      addressPersonal,
      phoneOfficial,
      phonePersonal,
      positionNature,
      institution,
      designation,
      service,
      grade,
      salaryCode,
      appointmentDate,
      requestedBungalow,
      requestedLeaveType,
      leaveFrom,
      leaveTo,
      leaveDays,
      substitutes,
      retiredIdCard,
      applicantSignature,
      applicantDate
    } = req.body;

    const booking = new BookingFormModel({
      fullName,
      email,
      nic,
      addressOfficial,
      addressPersonal,
      phoneOfficial,
      phonePersonal,
      positionNature,
      institution,
      designation,
      service,
      grade,
      salaryCode,
      appointmentDate,
      requestedBungalow,
      requestedLeaveType,
      leaveFrom,
      leaveTo,
      leaveDays,
      substitutes,
      retiredIdCard,
      applicantSignature,
      applicantDate,
      user: id  
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export async function getBookings(req, res){
    try{
        const bookings = await BookingFormModel.find();
        res.json({ success: true, bookings });
    }catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

// find a single booking details
export async function getBookingById(req,res){
    try{
        const singleBookinginfo = await BookingFormModel.findById(req.params.id)
        if (!singleBookinginfo) return res.status(404).json({ success: false, error: "Not found" });
        res.json({ success: true, singleBookinginfo });

    }catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
}

// Supervisor Approve
export async function supervisorApprove(req, res) {
  try {
    const { approverName, approverPosition, signatureUrl } = req.body;
    
    if (!approverName || !approverPosition) {
      return res.status(400).json({ success: false, error: "Approver name and position are required" });
    }

    const booking = await BookingFormModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });

    
    if (!booking.approvals) booking.approvals = {};

    booking.status = "supervisor-approved";
    booking.approvals.supervisor = {
      name: approverName,
      position: approverPosition,
      signatureUrl: signatureUrl || "",
      date: new Date(),
      decision: "approved"
    };

    await booking.save();

    // Send email to applicant
    await sendEmail(
      booking.email,
      "Supervisor Approval - Circuit Bungalow Booking",
      `<p>Dear ${booking.fullName},</p>
       <p>Your booking request for <b>${booking.requestedBungalow}</b> has been <b>approved by Supervisor</b>.</p>
       <p>Next step: SDAG approval.</p>`
    );

    
    res.json({ success: true, message: "Booking approved by supervisor", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

// Supervisor Reject
export async function supervisorReject(req, res) {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ success: false, error: "Reason is required" });
    }

    const booking = await BookingFormModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });

    if (!booking.approvals) booking.approvals = {};

    booking.status = "supervisor-rejected";
    booking.approvals.supervisor = {
      name: "", 
      position: "",
      signatureUrl: "",
      date: new Date(),
      decision: "rejected",
      reason: reason || ""
    };

    await booking.save();

    await sendEmail(
      booking.email,
      "Booking Rejected - Supervisor",
      `<p>Dear ${booking.fullName},</p>
      <p>Unfortunately, your booking request for <b>${booking.requestedBungalow}</b> has been <b>rejected by Supervisor</b>.</p>`
    );

    res.json({ success: true, message: "Booking rejected by supervisor", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

// SDAG Approve
export async function sdagApprove(req, res) {
  try {
    const { approverName, approverPosition, signatureUrl } = req.body;

    if (!approverName || !approverPosition) {
      return res.status(400).json({ success: false, error: "Approver name and position are required" });
    }

    const booking = await BookingFormModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });

    if (!booking.approvals) booking.approvals = {};

    booking.status = "sdag-approved";
    booking.approvals.sdag = {
      name: approverName,
      position: approverPosition,
      signatureUrl: signatureUrl || "",
      date: new Date(),
      decision: "approved"
    };

    await booking.save();

    await sendEmail(
      booking.email,
      "SDAG Approval - Circuit Bungalow Booking",
      `<p>Dear ${booking.fullName},</p>
      <p>Your booking request for <b>${booking.requestedBungalow}</b> has been <b>approved by SDAG</b>.</p>
      <p>Please proceed with payment to confirm your booking.</p>`
    );

    res.json({ success: true, message: "Booking approved by SDAG", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

// SDAG Reject
export async function sdagReject(req, res) {
  try {
    const { approverName, approverPosition, signatureUrl } = req.body;

    if (!approverName || !approverPosition) {
      return res.status(400).json({ success: false, error: "Approver name and position are required" });
    }

    const booking = await BookingFormModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });

    if (!booking.approvals) booking.approvals = {};

    booking.status = "sdag-rejected";
    booking.approvals.sdag = {
      name: approverName,
      position: approverPosition,
      signatureUrl: signatureUrl || "",
      date: new Date(),
      decision: "rejected"
    };

    await booking.save();

    await sendEmail(
      booking.email,
      "Booking Rejected - SDAG",
      `<p>Dear ${booking.fullName},</p>
      <p>Unfortunately, your booking request for <b>${booking.requestedBungalow}</b> has been <b>rejected by SDAG</b>.</p>`
    );

    res.json({ success: true, message: "Booking rejected by SDAG", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}

// Payment Confirm
// export async function confirmPayment(req, res) {
//   try {
//     const booking = await BookingFormModel.findById(req.params.id);
//     if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });

//     booking.status = "confirmed";
//     await booking.save();

//     await sendEmail(
//       booking.email,
//       "Booking Confirmed ✅",
//       `<p>Dear ${booking.fullName},</p>
//       <p>Your booking request for <b>${booking.requestedBungalow}</b> is now <b>confirmed</b>.</p>
//       <p>Thank you for using the Survey Department booking system!</p>`
//     );

//     res.json({ success: true, message: "Booking payment confirmed", booking });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// }