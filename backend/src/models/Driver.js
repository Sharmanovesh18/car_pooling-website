import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  carModel: { type: String },
  carNumber: { type: String },
  area: { type: String },
  rating: { type: Number, default: 4.8 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Driver", driverSchema);
