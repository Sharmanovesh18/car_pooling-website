import express from 'express';
import Booking from '../models/Booking.js';
const router = express.Router();

router.get('/bookings/history/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId }).sort({ bookingDate: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch booking history" });
  }
});

export default router;