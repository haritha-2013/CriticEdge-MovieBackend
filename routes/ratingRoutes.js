import express from 'express';
import { createRating, deleteRating, getRatingByID, getRatings, updateRating } from '../controllers/ratingController.js';
import authUser from '../middlewares/authMiddleware.js';

const router = express.Router(); 

// Creating a new rating
router.post('/', authUser, createRating);

// To get all ratings
router.get('/', getRatings);

// To get rating by ID
router.get('/:id', getRatingByID);

// To update a rating
router.put('/:id', authUser, updateRating);

// To delete a rating
router.delete('/:id', authUser, deleteRating) ;

export default router;