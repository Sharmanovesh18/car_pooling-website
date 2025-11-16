import express from 'express';
const router = express.Router();

// POST /api/rides/book
router.post('/book', (req, res) => {
  const { rideId, userId } = req.body;

  if (!rideId || !userId) {
    return res.status(400).json({ error: 'rideId and userId are required' });
  }

  // booking logic here (legacy; main router has full implementation)
  res.json({ success: true, message: 'Ride booked successfully!' });
});

export default router;