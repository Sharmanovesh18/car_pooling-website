import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";
import { User } from "../models/User.js";

// POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      rideId,
      start,
      destination,
      date,
      time,
      fare,
      driver,
      distanceKm
    } = req.body;

    if (!userId || !rideId) {
      return res.status(400).json({ error: "userId and rideId are required" });
    }

    // Find user and ride
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "user not found" });
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ error: "ride not found" });

    // Add user to ride's passengers if not already present
    if (!ride.passengers) ride.passengers = [];
    if (!ride.passengers.includes(userId)) {
      ride.passengers.push(userId);
      await ride.save();
    }

    // Create booking
    const booking = await Booking.create({
      rideId,
      driver: driver || ride.driver,
      start,
      destination,
      date,
      time,
      fare,
      distanceKm,
      passengers: [{ userId: user._id, name: user.name }],
      status: "confirmed"
    });

    // Return booking details and message
    res.status(201).json({
      bookingId: booking._id,
      start: booking.start,
      destination: booking.destination,
      date: booking.date,
      time: booking.time,
      fare: booking.fare,
      driver: booking.driver,
      distanceKm: booking.distanceKm,
      passengers: booking.passengers,
      message: "Thank you! You have successfully booked your ride."
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Booking failed", details: err.message });
  }
};

export default createBooking;