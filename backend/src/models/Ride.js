import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  fare: { type: Number, required: true },
  driver: {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    img: { type: String },
    phone: { type: String },
  },
  vehicleType: { type: String },
  remainingSeats: { type: Number, default: 4 },
  stops: [String],
});

export default mongoose.model('Ride', rideSchema);