import express from 'express'
import { createBooking, getBookingById, getBookings } from '../Controller/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/",createBooking)
bookingRouter.get("/", getBookings);        
bookingRouter.get("/:id", getBookingById); 

export default bookingRouter;