import mongoose from "mongoose";

const RideSchema = new mongoose.Schema({
  source: String,
  destination: String,
  startTime: String,
  endTime: String,
  duration: String,
  fare: Number,
  driver: String,
  driverImg: String,
  rating: Number,
  bookingType: String
});

export const Ride = mongoose.model("Ride", RideSchema);
