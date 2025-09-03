import express from "express";
import {
  createBooking,
  shareRide,
  bookingHistory
} from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings
router.post("/", createBooking);

// POST /api/bookings/:bookingId/share  { userId }
router.post("/:bookingId/share", shareRide);

// GET /api/bookings/history/:userId
router.get("/history/:userId", bookingHistory);

export default router;
