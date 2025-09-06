import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  coords: {
    lat: Number,
    lng: Number,
    accuracy: Number,
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Location", locationSchema);
