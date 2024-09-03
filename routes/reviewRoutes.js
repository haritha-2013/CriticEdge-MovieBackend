import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import { createReview, deleteReview, getReviewByID, getReviewsByMovie, updateReview } from '../controllers/reviewController.js';

const router = express.Router();

// Create a new review
router.post('/', createReview);

// Get all review of a movie
router.get('/', getReviewsByMovie);

// Get review by ID
router.get('/:reviewID', getReviewByID);

// Update a review
router.put('/:reviewID',authUser, updateReview);

// Delete a review
router.delete('/:reviewID',authUser, deleteReview);

export default router; 