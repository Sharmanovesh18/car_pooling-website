import express from 'express';
import { createReview, listReviews } from '../controllers/reviewControllers.js';

const router = express.Router();

// Public: list reviews
router.get('/', listReviews);

// Public: create a review (could be protected if desired)
router.post('/', createReview);

export default router;
