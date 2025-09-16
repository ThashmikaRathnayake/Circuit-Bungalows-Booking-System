import BookingFormModel from "../models/Booking.js";

//save all booking requests in db
export async function createBooking(req, res){
    try{
        const booking = new BookingFormModel(req.body);
        await booking.save();
        res.json({ success: true, booking });
    }catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
    
}

//Get all bookings (for admin)

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