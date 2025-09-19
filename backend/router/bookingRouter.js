import express from 'express'
import {
  createBooking,
  getBookingById,
  getBookings,
  supervisorApprove,
  supervisorReject,
  sdagApprove,
  sdagReject,
//   confirmPayment
} from "../Controller/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/",protect,createBooking)
bookingRouter.get("/requests", getBookings);        
bookingRouter.get("/:id", getBookingById); 

bookingRouter.post("/supervisor/approve/:id", protect, supervisorApprove);
bookingRouter.post("/supervisor/reject/:id", protect, supervisorReject);
bookingRouter.post("/sdag/approve/:id", protect, sdagApprove);
bookingRouter.post("/sdag/reject/:id", protect, sdagReject);
// bookingRouter.post("/admin/payment/confirm/:id", confirmPayment);

export default bookingRouter;