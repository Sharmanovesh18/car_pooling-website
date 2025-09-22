import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  fare: { type: Number, required: true },
  driver: {
    name: { type: String, required: true },
    rating: { type: Number },
  },
  bookingDate: { type: Date, default: Date.now },
});

export default mongoose.model('Booking', bookingSchema);