import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
