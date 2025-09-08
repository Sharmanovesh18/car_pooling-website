import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driver: {
    name: { type: String, default: "Auto-Assigned" },
    phone: { type: String, default: "" },
    rating: { type: Number, default: 4.8 }
  },
  source: String,
  destination: String,
  date: String,   // ISO date string or yyyy-mm-dd
  time: String,   // hh:mm
  availableSeats: { type: Number, default: 3 },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Ride", rideSchema);
