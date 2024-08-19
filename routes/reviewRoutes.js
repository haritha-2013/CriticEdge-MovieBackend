import express from 'express';
import { deleteReview, getReviewID, getReviewsByMovie, updateReview } from '../controllers/reviewController.js';

const router = express.Router();

// Create a new review
router.get('/reviews/movie/:movieID', getReviewsByMovie);

// Get a review by ID
router.get('/reviews/:reviewID', getReviewID);

// Update a review
router.put('/reviews/:reviewID', updateReview);

// Delete a review
router.delete('/reviews/:reviewID', deleteReview);

export default router; // 