import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  coords: {
    lat: Number,
    lng: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Location", locationSchema);
