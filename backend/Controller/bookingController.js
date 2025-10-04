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


export async function getBookings(req, res) {
  try {
    let filter = {};

    if (req.user.role === "supervisor") {
      // Supervisor sees all bookings
      filter = {}; 
    } else if (req.user.role === "sdag") {
      // SDAG sees only bookings approved by supervisor
      filter.status = { $in: ["supervisor-approved", "sdag-approved", "sdag-rejected"] };
    } else {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    const bookings = await BookingFormModel.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
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
      "sdag@example.com", // Replace with real SDAG email or get dynamically
      "New Booking Approval Required",
      `<p>Dear SDAG,</p>
       <p>A new booking request for <b>${booking.requestedBungalow}</b> by ${booking.fullName} requires your approval.</p>
       <p>Please review it.</p>`
       
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
      <p>Unfortunately, your booking request for <b>${booking.requestedBungalow}</b> has been <b>rejected by Supervisor</b>.</p>
      <p>Reason: ${reason}</p>`
      
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
      `<p>Mr./Ms. ${booking.fullName},</p>
      As per your request made on ${booking.applicantDate}, I hereby approve the reservation of the Circuit Bungalow / Holiday Resort ${booking.requestedBungalow} 
      from ${booking.startDate} day at 10.00 a.m. until ${booking.endDate} day at 9.00 a.m.`
      


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

// Check availability
export async function checkAvailability(req, res) {
  try {
    const { bungalowName } = req.params;
    const bookings = await BookingFormModel.find({
      requestedBungalow: bungalowName,
      status: "sdag-approved",
    }).select("leaveFrom leaveTo -_id");
    console.log(`Found ${bookings.length} approved bookings for ${bungalowName}`);
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching availability:", err);
    res.status(500).json({ message: "Error fetching booked dates" });
  }
}