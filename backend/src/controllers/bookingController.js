import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";
import {User} from "../models/User.js";

/**
 * Helper: compute fare using same function as rideController
 * (copy to avoid circular import; keep consistent)
 */
const DISTANCES = [2, 5, 10, 20, 50];
const FARE_TABLE = [50, 120, 240, 420, 1000];

function distanceIndexForPair(source = "", destination = "") {
  const s = (source + "|" + destination).toLowerCase();
  let acc = 0;
  for (let i = 0; i < s.length; i++) acc = (acc * 31 + s.charCodeAt(i)) >>> 0;
  return acc % DISTANCES.length;
}
function computeFare(source, destination) {
  const idx = distanceIndexForPair(source, destination);
  return { distanceKm: DISTANCES[idx], fare: FARE_TABLE[idx] };
}

// create a booking
export const createBooking = async (req, res) => {
  try {
    const {
      rideId, userId, start, destination, date, time, paymentMethod = "cash"
    } = req.body;
    if (!userId || !start || !destination) {
      return res.status(400).json({ error: "userId, start and destination required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "user not found" });

    // if rideId provided, pull driver info, otherwise create booking with minimal driver placeholder
    let driver = { name: "Driver Not Assigned", phone: "", rating: 4.8 };
    if (rideId) {
      const ride = await Ride.findById(rideId);
      if (ride) driver = ride.driver;
    }

    const { fare } = computeFare(start, destination);

    const booking = await Booking.create({
      rideId: rideId || null,
      driver,
      start,
      destination,
      date,
      time,
      fare,
      paymentMethod,
      passengers: [{ userId: user._id, name: user.name }],
      status: "confirmed"
    });

    // Success payload (for popup)
    const payload = {
      bookingId: booking._id,
      start: booking.start,
      destination: booking.destination,
      fare: booking.fare,
      driver: booking.driver,
      passengers: booking.passengers,
      message: "Booking confirmed"
    };

    return res.status(201).json(payload);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};

// add a co-passenger (share ride)
export const shareRide = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "user not found" });

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "booking not found" });

    // prevent duplicate
    if (booking.passengers.some(p => p.userId?.toString() === userId.toString())) {
      return res.status(400).json({ error: "user already a passenger" });
    }

    booking.passengers.push({ userId: user._id, name: user.name });
    await booking.save();

    return res.json({
      bookingId: booking._id,
      driver: booking.driver,
      passengers: booking.passengers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};

// booking history for a user
export const bookingHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ "passengers.userId": userId })
      .sort({ createdAt: -1 })
      .populate("rideId")
      .lean();

    return res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};
