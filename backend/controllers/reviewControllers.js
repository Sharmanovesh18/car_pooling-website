import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { name, email, comment, rating } = req.body;
    if (!name || !email || !comment || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const review = new Review({ name, email, comment, rating });
    await review.save();
    res.status(201).json({ message: 'Review saved', review });
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Failed to save review' });
  }
};

export const listReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ ok: true, count: reviews.length, reviews });
  } catch (err) {
    console.error('Error listing reviews:', err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};
