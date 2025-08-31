import { Booking } from "../models/Booking.js";
import mongoose from "mongoose";

const toNumber = (v, d = 0) => (typeof v === "number" ? v : Number(v ?? d) || d);

export const createBooking = async (req, res, next) => {
  try {
    const {
      userId,
      start,
      destination,
      date,
      time,
      vehicleType,
      driverName,
      fare
    } = req.body;

    if (!userId || !start || !destination || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const booking = await Booking.create({
      userId,
      start,
      destination,
      date,
      time,
      vehicleType: vehicleType || "Sedan",
      driverName: driverName || "Auto-Assigned",
      fare: toNumber(fare, 0),
      status: "booked"
    });

    return res.status(201).json({ message: "Booked successfully", data: booking });
  } catch (err) {
    next(err);
  }
};

export const getHistoryByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const history = await Booking.find({ userId }).sort({ createdAt: -1 }).lean();
    return res.json({ data: history });
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }
    const booking = await Booking.findById(id).lean();
    if (!booking) return res.status(404).json({ message: "Not found" });
    return res.json({ data: booking });
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }
    const booking = await Booking.findByIdAndUpdate(
      id,
      { $set: { status: "cancelled" } },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Cancelled", data: booking });
  } catch (err) {
    next(err);
  }
};
