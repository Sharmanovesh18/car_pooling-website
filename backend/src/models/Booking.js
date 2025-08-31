import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",        // optional if you add real auth
      required: true
    },
    start: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // UI date string (e.g., "2025-09-01")
    time: { type: String, required: true }, // UI time string (e.g., "14:30")
    // optional fields your UI may show on cards:
    vehicleType: { type: String, default: "Sedan" },
    driverName: { type: String, default: "Auto-Assigned" },
    fare: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["booked", "ongoing", "completed", "cancelled"],
      default: "booked"
    }
  },
  { timestamps: true }
);

BookingSchema.index({ userId: 1, createdAt: -1 });

export const Booking = mongoose.model("Booking", BookingSchema);
