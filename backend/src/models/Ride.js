import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driver: { type: String, default: "Auto-Assigned" },
  source: String,
  destination: String,
  date: String,   // ISO date string or yyyy-mm-dd
  time: String,   // hh:mm
  availableSeats: { type: Number, default: 3 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Ride", rideSchema);
