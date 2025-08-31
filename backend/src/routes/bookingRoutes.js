import { Router } from "express";
import {
  createBooking,
  getHistoryByUser,
  getBookingById,
  cancelBooking
} from "../controllers/bookingController.js";

const router = Router();

/**
 * POST /api/bookings
 * body: { userId, start, destination, date, time, vehicleType?, driverName?, fare? }
 */
router.post("/", createBooking);

/**
 * GET /api/bookings/:userId
 * returns booking history for user
 */
router.get("/:userId", getHistoryByUser);

/**
 * GET /api/bookings/one/:id
 * returns a single booking
 */
router.get("/one/:id", getBookingById);

/**
 * PATCH /api/bookings/:id/cancel
 * cancel a booking
 */
router.patch("/:id/cancel", cancelBooking);

export default router;
