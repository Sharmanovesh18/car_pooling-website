import express from "express";
import { bookRide, getHistory } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings
router.post("/", async (req, res, next) => {
  console.log("Received booking request:", req.body);
  try {
    await createBooking(req, res);
  } catch (err) {
    next(err);
  }
});

// POST /api/bookings/:bookingId/share
router.post("/book", bookRide);

router.get("/history/:userId", getHistory);

// GET /api/bookings/history/:userId
// router.get("/history/:userId", async (req, res, next) => {
//   console.log(`Fetching booking history for user ${req.params.userId}`);
//   try {
//     await bookingHistory(req, res);
//   } catch (err) {
//     next(err);
//   }
// }); router;
export default router;
