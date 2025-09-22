import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  coords: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Use a default export
export default mongoose.model('Location', locationSchema);